import React from 'react'
import { bannerStyles } from '../assets/dummyStyles'
import { Calendar, Clock, Phone, Ribbon, ShieldUser, Star, Stethoscope, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import banner from '../assets/BannerImg.png'

const Banner = () => {
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={bannerStyles.bannerContainer}
        >
            <div className={bannerStyles.mainContainer}>
                <div className={bannerStyles.borderOutline}>
                    <div className={bannerStyles.outerAnimatedBand}></div>
                    <div className={bannerStyles.innerWhiteBorder}></div>
                </div>

                <div className={bannerStyles.contentContainer}>
                    <div className={bannerStyles.flexContainer}>
                        <div className={bannerStyles.leftContent}>
                            <motion.div variants={itemVariants} className={bannerStyles.headerBadgeContainer}>
                                <div className={bannerStyles.stethoscopeContainer}>
                                    <div className={bannerStyles.stethoscopeInner}>
                                        <Stethoscope className={bannerStyles.stethoscopeIcon}/>
                                    </div>
                                </div>

                                <div className={bannerStyles.titleContainer}>
                                    <h1 className={bannerStyles.title}>
                                        Medi
                                        <span className={bannerStyles.titleGradient}>Care+</span>
                                    </h1>

                                    {/* Stars */}
                                    <div className={bannerStyles.starsContainer}>
                                        <div className={bannerStyles.starsInner}>
                                            {[1,2,3,4,5].map((star) => (
                                                <Star className={bannerStyles.starIcon} key={star}/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* tagline */}
                            <motion.p variants={itemVariants} className={bannerStyles.tagline}>
                                Premium Healthcare
                                <span className={`block ${bannerStyles.taglineHighlight}`}>
                                    At Your Fingertips
                                </span>
                            </motion.p>

                            <motion.div variants={itemVariants} className={bannerStyles.featuresGrid}>
                                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderGreen}`}>
                                    <Ribbon className={bannerStyles.featureIcon}/>
                                    <span className={bannerStyles.featureText}>Certified Specialists</span>
                                </div>

                                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderBlue}`}>
                                    <Clock className={bannerStyles.featureIcon}/>
                                    <span className={bannerStyles.featureText}>24/7 Availability</span>
                                </div>

                                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderEmerald}`}>
                                    <ShieldUser className={bannerStyles.featureIcon}/>
                                    <span className={bannerStyles.featureText}>Safe &amp; Secure</span>
                                </div>

                                <div className={`${bannerStyles.featureItem} ${bannerStyles.featureBorderPurple}`}>
                                    <Users className={bannerStyles.featureIcon}/>
                                    <span className={bannerStyles.featureText}>500+ Doctors</span>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className={bannerStyles.ctaButtonsContainer}>
                                <button onClick={() => navigate("/doctors")} className={bannerStyles.bookButton}>
                                    <div className={bannerStyles.bookButtonOverlay}></div>
                                    <div className={bannerStyles.bookButtonContent}>
                                        <Calendar className={bannerStyles.bookButtonIcon}/>
                                        <span>Book Appointment Now</span>
                                    </div>
                                </button>

                                <button onClick={() => (window.location.href = "tel:8299431275")} className={bannerStyles.emergencyButton}>
                                    <div className={bannerStyles.emergencyButtonContent}>
                                        <Phone className={bannerStyles.emergencyButtonIcon}/>
                                        <span>Emergency Call</span>
                                    </div>
                                </button>
                            </motion.div>
                        </div>

                        <motion.div 
                            variants={imageVariants}
                            className={bannerStyles.rightImageSection}
                        >
                            <div className={bannerStyles.imageContainer}>
                               <div className={bannerStyles.imageFrame}>
                                    <img src={banner} alt="banner" className={bannerStyles.image}/>
                               </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Banner

