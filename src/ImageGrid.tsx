import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
}

const ImageGrid: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeProject();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedProject) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject, currentImageIndex]);

    const projects: Project[] = [
      {
        id: 1,
        title: "Power Distribution Module",
        subtitle: "Automotive Electronics",
        images: [
          "/images/BoardNoEnclosure.png",
          "/images/alllayers.png",
          "/images/EnclosureNoBoard.png",
          "/images/FullEnclosureAndBoard.png",
          "/images/layer1.png",
          "/images/layer2.png",
          "/images/layer3.png",
          "/images/layer4.png",
          "/images/nopours.png",
          "/images/PDMBlockDiagram.png",
        ],
        description:
          "Multi-layer PCB power distribution module for automotive applications with integrated overcurrent protection and diagnostics. It has 15 switched outputs with 5 capable of high amperage draw. Each switch has current and voltage sensing. There are also LEDs for indicating switch status.",
      },
      {
        id: 2,
        title: "Heads Up Display",
        subtitle: "Automotive Instrumentation",
        images: [
          "/images/HUD_00.png",
          "/images/HUD_01.png",
          "/images/HUD_02.png",
          "/images/HUD_03.png",
          "/images/HUD_04.jpg",
        ],
        description:
          "Custom HUD providing real-time performance metrics in the driver's line of sight with vehicle system integration.\nIt pulls engine data via CAN and RS232. It gets real-time location with GPS, and vehicle dynamics with a 6-axis accelerometer and gyroscope",
      },
      {
        id: 3,
        title: "SSE Log Viewing Website",
        subtitle: "Performance Engineering",
        images: [
          "/images/LogViewerWebsite1.png",
          "/images/LogViewerWebsite2.png",
        ],
        description:
          "Website used to analyze logs taken from the Heads Up Display logging. Creates graphs and displays data on a map using Google Maps API.",
      },
    ];

    const openProject = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        } else if (selectedProject) {
            setCurrentImageIndex(0);
        }
    };

    const prevImage = () => {
        if (selectedProject && currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        } else if (selectedProject) {
            setCurrentImageIndex(selectedProject.images.length - 1);
        }
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="flex flex-col items-center">

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow transition-all"
                        style={{ backgroundColor: 'var(--color-bg-card)' }}
                        whileHover={{ y: -4 }}
                        onClick={() => openProject(project)}
                    >
                        <div className="h-40 overflow-hidden">
                            <motion.img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-base mt-1" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Project modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
                    onClick={closeProject}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg shadow-lg w-full max-w-6xl relative"
                        style={{ backgroundColor: 'var(--color-bg-card)' }}
                        onClick={handleModalClick}
                    >
                        <button
                            onClick={closeProject}
                            className="absolute top-2 right-2 p-1 z-10"
                            style={{ color: 'var(--color-text-muted)' }}
                            aria-label="Close dialog"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image viewer */}
                            <div className="w-full md:w-3/5 relative">
                                <div className="aspect-video rounded overflow-hidden" style={{ backgroundColor: 'var(--color-bg-muted)' }}>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={selectedProject.images[currentImageIndex]}
                                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                        className="w-full h-full object-contain"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />

                                    {selectedProject.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full"
                                                style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: '#1a1a1f' }}
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-full"
                                                style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: '#1a1a1f' }}
                                                aria-label="Next image"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Image indicators */}
                                {selectedProject.images.length > 1 && (
                                    <div className="flex justify-center mt-2 gap-1">
                                        {selectedProject.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className="w-1.5 h-1.5 rounded-full transition-colors"
                                                style={{ backgroundColor: index === currentImageIndex ? 'var(--color-accent)' : 'var(--color-border)' }}
                                                aria-label={`Go to image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Project details */}
                            <div className="w-full md:w-2/5">
                                <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{selectedProject.subtitle}</span>
                                <h2 className="text-xl font-medium mt-1" style={{ color: 'var(--color-text)' }}>{selectedProject.title}</h2>

                                <p className="mt-3 text-md" style={{ color: 'var(--color-text-muted)' }}>{selectedProject.description}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ImageGrid;