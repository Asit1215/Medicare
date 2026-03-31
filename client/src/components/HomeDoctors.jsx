import React, { useEffect, useState } from "react";
import { homeDoctorsStyles, iconSize } from "../assets/dummyStyles";
import { Link } from "react-router-dom";
import { ChevronRight, Medal, MousePointer2Off } from "lucide-react";
import { motion } from "framer-motion";

const HomeDoctors = ({ previewCount = 12 }) => {
  const API_BASE = window.location.hostname === "localhost" ? "http://localhost:4000" : "https://medicare-server-mu64.onrender.com";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  //to fetch doctors from the service side
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/doctors`);
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            (json && json.message) || `Failed to load doctors (${res.status})`;
          if (!mounted) return;
          setError(msg);
          setDoctors([]);
          setLoading(false);
          return;
        }
        const items = (json && (json.data || json)) || [];
        const normalized = (Array.isArray(items) ? items : []).map((d) => {
          const id = d._id || d.id;
          const image =
            d.imageUrl || d.image || d.imageSmall || d.imageSrc || "";
          const available =
            (typeof d.availability === "string"
              ? d.availability.toLowerCase() === "available"
              : typeof d.available === "boolean"
                ? d.available
                : d.availability === true) || d.availability === "Available";
          return {
            id,
            name: d.name || "Unknown",
            specialization: d.specialization || "",
            image,
            experience:
              d.experience || d.experience === 0 ? String(d.experience) : "",
            fee: d.fee ?? d.price ?? 0,
            available,
            raw: d,
          };
        });

        if (!mounted) return;
        setDoctors(normalized);
      } catch (err) {
        if (!mounted) return;
        console.error("load doctors error:", err);
        setError("Network error while loading doctors.");
        setDoctors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  const preview = doctors.slice(0, previewCount);
  return (
    <section className={homeDoctorsStyles.section}>
      <div className={homeDoctorsStyles.container}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={homeDoctorsStyles.header}
        >
          <h1 className={homeDoctorsStyles.title}>
            Our{" "}
            <span className={homeDoctorsStyles.titleSpan}>Medical Team</span>
          </h1>
          <p className={homeDoctorsStyles.subtitle}>
            Book appointment quickly with our verified specialists
          </p>
        </motion.div>

        {/* Error */}
        {error ? (
          <div className={homeDoctorsStyles.errorContainer}>
            <div className={homeDoctorsStyles.errorText}>{error}</div>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                (async () => {
                  try {
                    const res = await fetch(`${API_BASE}/api/doctors`);
                    const json = await res.json().catch(() => null);
                    const items = (json && (json.data || json)) || [];
                    const normalized = (Array.isArray(items) ? items : []).map(
                      (d) => {
                        const id = d._id || d.id;
                        const image = d.imageUrl || d.image || "";
                        const available =
                          (typeof d.availability === "string"
                            ? d.availability.toLowerCase() === "available"
                            : typeof d.available === "boolean"
                              ? d.available
                              : d.availability === true) ||
                          d.availability === "Available";
                        return {
                          id,
                          name: d.name || "Unknown",
                          specialization: d.specialization || "",
                          image,
                          experience: d.experience || "",
                          fee: d.fee ?? d.price ?? 0,
                          available,
                          raw: d,
                        };
                      },
                    );
                    setDoctors(normalized);
                    setError("");
                  } catch (err) {
                    console.error(err);
                    setError("Network error while loading doctors.");
                    setDoctors([]);
                  } finally {
                    setLoading(false);
                  }
                })();
              }}
              className={homeDoctorsStyles.retryButton}
            >
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className={homeDoctorsStyles.skeletonGrid}>
            {Array.from({ length: previewCount }).map((_, i) => (
              <div key={i} className={homeDoctorsStyles.skeletonCard}>
                <div className={homeDoctorsStyles.skeletonImage}></div>
                <div className={homeDoctorsStyles.skeletonText1}></div>
                <div className={homeDoctorsStyles.skeletonText2}></div>
                <div className=" flex gap-2 mt-auto">
                  <div className={homeDoctorsStyles.skeletonButton}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={homeDoctorsStyles.doctorsGrid}
          >
            {preview.map((doctor) => (
              <motion.article
                key={doctor.id || doctor.name}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={homeDoctorsStyles.article}
              >
                {doctor.available  ? (
                  <Link
                    to={`/doctors/${doctor.id}`}
                    state={{
                      doctor: doctor.raw || doctor,
                    }}
                  >
                    <div className={homeDoctorsStyles.imageContainerAvailable}>
                      <img
                        src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=400&q=80"}
                        alt={doctor.name}
                        loading="lazy"
                        className={homeDoctorsStyles.image}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <div
                    className={homeDoctorsStyles.imageContainerUnavailable}
                  >
                     <img
                      src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=400&q=80"}
                      alt={doctor.name}
                      loading="lazy"
                      className={homeDoctorsStyles.image}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className={homeDoctorsStyles.unavailableBadge}>
                      Not available
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className={homeDoctorsStyles.cardBody}>
                <h3 className={homeDoctorsStyles.doctorName} id={`doctor-${doctor.id}-name`}>
                {doctor.name}
                </h3>

                <p className={homeDoctorsStyles.specialization}>
                {doctor.specialization}
                </p>
                <div className={homeDoctorsStyles.experienceContainer}>
                    <div className={homeDoctorsStyles.experienceBadge}>
                        <Medal className={`${iconSize.small} h-4`}/>
                        <span>{doctor.experience} years Experience</span>
                    </div>
                </div>

                <div className={homeDoctorsStyles.buttonContainer}>
                    <div className=" w-full">
                        {doctor.available ? (
                            <Link to={`/doctors/${doctor.id}`} state={{
                                doctor: doctor.raw || doctor
                            }} className={homeDoctorsStyles.buttonAvailable}>
                                <ChevronRight className=" w-5 h-5"/>
                                Book Now
                            </Link>
                        ) : (
                            <button disabled className={homeDoctorsStyles.buttonUnavailable}>
                                <MousePointer2Off className=" w-5 h-5"/>
                                Not available
                            </button>
                        )}
                    </div>
                </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
      <style>{homeDoctorsStyles.customCSS}</style>
    </section>
  );
};

export default HomeDoctors;

