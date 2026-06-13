"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; 
import { FaGithub, FaGitlab, FaLinkedin, FaFilePdf, FaGlobe, FaUserTie } from "react-icons/fa";
import dynamic from "next/dynamic";

const WaterWave = dynamic<any>(
  () => import("react-water-wave"),
  { ssr: false }
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xanjywdq", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setIsSent(true);
        form.reset(); 
        setTimeout(() => setIsSent(false), 5000);
      } else {
        alert("Oups, une erreur s'est produite lors de l'envoi.");
      }
    } catch (error) {
      alert("Erreur de connexion. Veuillez réessayer.");
    }
    
    setIsSubmitting(false);
  };
 

  useEffect(() => {
  
    if (selectedProject || selectedPhoto !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject, selectedPhoto]);

  const projects = [
    {
      id: 1,
      image: "/projet-recettes.png",
     
      techs: "DART • HTML • ARCHITECTURE LOCALE",
      title: "App de Recommandation de Recettes",
      year: "2024",
      github: "https://github.com/DevKosX/S501_Developpement",
      shortDesc: "Application mobile de recommandation adaptative fonctionnant entièrement hors-ligne, sans dépendance à un serveur distant.",
      fullDesc: `Contexte
Ce projet a été réalisé dans le cadre de la SAE 5.Real.01 en troisième année de BUT Informatique à l'IUT de Villetaneuse. L'objectif était de concevoir une application mobile de recommandation adaptative fonctionnant entièrement hors-ligne.

Au sein d'une équipe de six personnes, j'ai développé la page "gestion du frigo" et conçu l'architecture du projet. J'ai structuré le code en utilisant le pattern Repository pour bien séparer la logique métier de la base de données. J'ai aussi utilisé Provider pour rendre l'interface réactive. Pour finir, j'ai également travaillé sur l'ergonomie pour optimiser la saisie des quantités par l'utilisateur, et j'ai ajouté des index sur les clés étrangères de notre base de données locale pour accélérer les requêtes de recherche.

Difficultés rencontrés & Solutions
La principale difficulté a été de synchroniser l'interface utilisateur et la base de données locale sans créer de latence . L'utilisation du pattern Repository de la gestion d'état asynchrone m'a permis de résoudre ce problème en isolant les requêtes trop lourdes.

Bilan & Acquis
Ce projet m'a fait réaliser l'importance de l'optimisation sur des appareils aux ressources limitées . J'ai appris à concevoir une architecture "Offline-First", tout en respectant des contraintes de performance et d'ergonomie.`,
    },
    {
      id: 2,
      image: "/projet-ubereats.png",
      techs: "PYTHON • MONGODB • REDIS",
      title: "Uber Eats Simulation",
      year: "2025",
      report: "/Rapport_Projet_Uber_Eats.pdf",
      shortDesc: "Conception d'un système asynchrone capable de propager les changements d'état d'une commande en temps réel.",
      fullDesc: `Contexte
Les plateformes de livraison modernes nécessitent une synchronisation parfaite entre trois acteurs distincts (Client, Restaurant, Livreur) qui ne communiquent jamais directement. L'objectif de ce projet était de concevoir un système de propagation d'états purement asynchrone et temps réel, sans faire appel aux API REST classiques. L'idée directrice était de comparer par la pratique deux paradigmes NoSQL majeurs : MongoDB et Redis.

J'ai développé l'ensemble de l'infrastructure à l'aide de scripts Python autonomes, conteneurisés sous Docker. Pour optimiser les performances, j'ai appliqué une modélisation dénormalisée stricte, intégrant par exemple les menus directement au sein des documents "Restaurant" afin d'éliminer les jointures coûteuses. Côté MongoDB, j'ai exploité les "Change Streams" sur un Replica Set pour que les services réagissent passivement aux changements d'état en base, tout en m'appuyant sur son Pipeline d'Agrégation natif pour générer des statistiques de vente complexes. En parallèle, pour l'approche Redis, j'ai implémenté le mécanisme Pub/Sub pour gérer la messagerie instantanée, couplé à des "Hashes" pour assurer un stockage d'état extrêmement rapide.

Difficultés rencontrés & Solutions
Le défi le plus critique a été la gestion de la concurrence, en particulier pour éviter qu'une "Race Condition" ne permette à deux livreurs d'accepter la même commande au même instant. J'ai résolu ce problème en mettant en place des transactions atomiques pour la version MongoDB, et en développant des transactions optimistes basées sur le mécanisme WATCH/MULTI/EXEC pour la version Redis.

Bilan & Acquis
Grâce à ce projet, j'ai vraiment compris qu'il n'y a pas de base de données parfaite et qu'il faut faire des compromis. En pratique, j'ai pu voir que MongoDB est très fiable pour garder des données cohérentes et faire des statistiques. De son côté, Redis est ultra rapide pour envoyer des messages, mais son fonctionnement "Fire-and-Forget" rend la sauvegarde des données beaucoup plus compliquée à gérer.`,
    },
    {
      id: 3,
      image: "/projet-stages.png",
 
      techs: "PHP • CSS • JAVASCRIPT",
      title: "Plateforme de Gestion de Stages",
      year: "2024",
      github: "https://github.com/DevKosX/GestionDesStagesProject",
      shortDesc: "Application complète couvrant toutes les phases du cycle de vie d'un stage pour les étudiants et tuteurs.",
      fullDesc: `Contexte
L'objectif de ce projet était de créer un outil complet pour gérer les périodes de stage. L'application devait connecter trois types d'utilisateurs : les étudiants, les tuteurs (à l'école et en entreprise) et l'administration. Il fallait numériser tout le cycle de vie du stage, depuis la préparation de la campagne et le dépôt du compte rendu d'installation, jusqu'aux échanges pendant le stage et la planification des soutenances finales.

Cette plateforme a été développée en équipe, en utilisant le modèle MVC et une structure web classique : PHP pour la logique côté serveur, couplé à du JavaScript et du CSS pour l'interface. Au sein du groupe, j'étais en charge du tableau de bord de l'étudiant. Mon rôle a été de développer la page de gestion de stage, un espace où l'étudiant peut retrouver toutes les informations liées à sa convention, consulter les échéances importantes et déposer ses documents (compte rendu, rapport).

Difficultés rencontrés & Solutions
La difficulté principal à été de sécurisé les sessions et l'affichage dynamique. Il fallait s'assurer qu'un étudiant ne puisse voir que ses propres informations et que les fichiers qu'il dépose soient bien rattachés à son profil, sans risque d'écrasement. J'ai donc dû mettre en place des contrôles stricts en PHP pour sécuriser les requêtes, gérer les droits d'accès et bloquer les failles.

Bilan & Acquis
Ce projet à permis de consolider ma capacité à travailler en équipe sur un même code. J'ai vraiment aimé le fait de faire passer un processus administratif lourd en un outil simple à utiliser. J'ai aussi compris que quand on code une interface, l'ergonomie et la clarté des informations affichées (surtout pour un étudiant qui cherche ses dates de rendu) sont tout aussi importantes que le code qui tourne derrière.`,
    },
    {
      id: 4,
      image: "/projet-24h.png",
    
      techs: "MANAGEMENT • ORGANISATION • COMMUNICATION",
      title: "24h de l'Info",
      year: "2024",
      website: "https://delrone98.wixsite.com/24hchronoinfo",
      shortDesc: "Organisation d'un hackathon national de 24h et développement de la plateforme de l'événement.",
      fullDesc: `Contexte
Ce projet date de ma première année de BUT. L'idée était d'organiser un événement de 24 heures pour les étudiants en BUT Informatique dans toute la france, avec des épreuves de développement, d'algo et de cryptographie. 

Mon équipe et moi avons géré l'événement de A à Z : la communication, la logistique, la création d'affiche pour la promotion de l'événement et un site web. C'était ma toute première expérience et littéralement le premier site que je créais. Avec le recul, la technique était forcément très basique, mais il a parfaitement fait le job le jour J : afficher les résultats en direct, présenter les équipes et faire vivre l'événement.

Difficultés rencontrés & Solutions
Sur ce projet, les difficultés était l'organisation et la gestion de la fatigue. Tenir un événement pendant 24 heures, gérer les petits imprévus et coordonner tout le monde demande une bonne capacité d'adaptation et de la rigueur. Pour bien nous organisés, nous avons dû nous forcer à utiliser un tableau Kanban et à nous répartir les rôles très strictement.

Bilan & Acquis
C'est un projet très important pour moi. Techniquement, il me sert de point de comparaison et me montre à quel point j'ai évolué depuis la première année. Mais c'est surtout là que j'ai développé mes "soft skills". J'ai appris à travailler en équipe dans l'urgence et à communiquer clairement.`,
    },
    {
      id: 6,
      image: "/neon-space.png", 
      techs: "PYTHON • PYGAME • NUMPY",
      title: "Ultimate Neon Space",
      year: "2026",
      github: "https://github.com/daviddiema7/neon-space-play",
      report: "/Rapport_NeonSpace.pdf",
      shortDesc: "Développement from scratch d'un moteur graphique 2D avec gestion vectorielle et traitement d'image matriciel en temps réel.",
      fullDesc: `Contexte
Ce projet est un projet académique sur l'image numérique, je ne voulais pas juste afficher des images fixes. J'ai donc choisi de développer un petit jeu . L'objectif était de créer mon propre moteur graphique pour manipuler concrètement la géométrie, la lumière et les pixels.

J'ai tout codé en Python avec Pygame, NumPy et DrawSVG. Le principe du jeu est qu'aucune image n'est chargée : tous les éléments à l'écran sont générés mathématiquement. J'ai dû intégrer des matrices de rotation 2D pour calculer la position exacte de chaque point en temps réel. Pour donner ce style "néon", j'ai joué avec le canal Alpha et la synthèse additive (la superposition des couleurs crée du blanc), et j'ai utilisé le modèle HSV pour l'animation arc-en-ciel. J'ai aussi ajouté une fonctionnalité permettant d'exporter l'écran du jeu directement en fichier vectoriel SVG.

Difficultés rencontrés & Solutions
Le vrai problème que j'ai rencontré concernait les performances. Quand le joueur mettait pause, je voulais appliquer un filtre gris sur tout l'écran. Sauf que faire ce calcul de couleur pixel par pixel bloquait complètement la boucle du jeu pendant plusieurs secondes. J'ai réglé ce souci en remplaçant mes boucles classiques par des calculs matriciels avec NumPy. Grâce à ça, le traitement des couleurs RGB est devenu instantané, sans aucun lag.

Bilan & Acquis
Ce projet m'a obligé à faire le pont entre les mathématiques et la programmation. J'ai vraiment compris comment l'affichage fonctionne. J'ai aussi réalisé à quel point l'utilisation de matrices permet d'accélérer un programme Python par rapport à du code basique.`,
    },
    {
      id: 9,
      image: "/upger-project.png", 
      techs: "PYTHON • DJANGO • N8N",
      title: "Upger",
      year: "2026",
      shortDesc: "Remise en production d'un logiciel de suivi de sauvegardes et automatisation de reporting CRM lors de mon stage chez Qionis.",
      fullDesc: `Contexte
Lors de mon stage au Centre de Services de l'entreprise Qionis, ma mission principale était de remettre en marche et moderniser "Upger". Il s'agit d'un outil interne de suivi des sauvegardes clients, développé en 2016 sous Python 2.7 et Django, mais qui était totalement à l'arrêt depuis 2019 à cause d'environnements obsolètes.

J'ai commencé par analyser le code pour en comprendre l'architecture. Ma première action a été de rétablir la connexion à la boîte mail de supervision en migrant l'ancienne authentification basique vers le protocole sécurisé OAuth2 via Microsoft Azure. Au fil des semaines, j'ai entièrement migré l'application vers Python 3.12, corrigé les problèmes d'encodage, et refondu le système de génération de rapports PDF. J'ai ensuite rendu l'outil beaucoup plus intelligent en développant un algorithme d'auto-découverte des tâches par expressions régulières, et j'ai connecté Upger à Zendesk en utilisant la plateforme n8n pour automatiser l'ouverture et la clôture des tickets d'assistance.

Difficltés rencontrés & Solutions
Mon système de tickets automatiques fonctionnait, mais le script parcourait Zendesk en permanence, ce qui a rapidement saturé la limite de requêtes de l'API. J'ai dû repenser mon architecture en urgence. Au lieu d'interroger les serveurs de Zendesk à chaque boucle, j'ai créé une table de liaison locale dans la base de données d'Upger pour stocker les identifiants des tickets en cours. Cette simple modification a grandement réduit le nombre de requête API.

Bilan & Acquis
Ce stage m'a beaucoup appris sur la réalité du métier en entreprise. Au lieu de commencer un projet de zéro, j'ai dû me plonger dans le code de quelqu'un d'autre, le comprendre et trouver le problème. Au final, j'ai compris que le quotidien d'un développeur, c'est très souvent de maintenir et d'améliorer les outils qui existent déjà pour faciliter la vie de son équipe.`,
    }
  ];
  return (
    <main className="w-full min-h-screen relative overflow-x-hidden bg-transparent">
      
     
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0A0E17] border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col z-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white transition-colors z-50 backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto w-full flex-1 custom-scrollbar" data-lenis-prevent>
                <div className="relative w-full h-[200px] shrink-0">
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent"></div>
                </div>

                <div className="p-8 -mt-16 relative z-10">
                  <span className="text-[10px] font-bold tracking-widest text-yellow-500 uppercase mb-2 block">
                    {selectedProject.techs}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-yellow-500 text-xs font-bold mb-8">{selectedProject.year}</p>
                  
                 
                  <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-6 whitespace-pre-wrap pb-6">
                    {selectedProject.fullDesc}
                  </div>
                  
               
                  {(selectedProject.github || selectedProject.report || selectedProject.website) && (
                    <div className="flex flex-wrap items-center gap-4 mt-2 pt-6 border-t border-gray-800">
                      
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-sm md:text-base font-bold py-3 px-6 rounded-full transition-all hover:scale-105"
                        >
                          <FaGithub size={20} /> Voir le code
                        </a>
                      )}

                      {selectedProject.website && (
                        <a 
                          href={selectedProject.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-sm md:text-base font-bold py-3 px-6 rounded-full transition-all hover:scale-105"
                        >
                          <FaGlobe size={20} /> Voir le site
                        </a>
                      )}

                      {selectedProject.report && (
                        <a 
                          href={selectedProject.report} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-sm md:text-base font-bold py-3 px-6 rounded-full transition-all hover:scale-105"
                        >
                          <FaFilePdf size={20} /> Lire le rapport
                        </a>
                      )}

                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPhoto !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
         
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-5xl flex justify-center items-center pointer-events-none"
            >
             
              <img 
                src={`/photo-${selectedPhoto}.jpg`} 
                alt={`Photographie ${selectedPhoto} en grand`} 
                className="max-h-[90vh] max-w-full object-contain shadow-2xl rounded-sm pointer-events-auto"
              />
              
           
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-0 right-0 md:-right-16 md:top-0 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors pointer-events-auto backdrop-blur-md border border-white/10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


     
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-auto z-0">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/water-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <WaterWave
            imageUrl="/water-bg.jpg" 
            dropRadius={25}          
            perturbance={0.03}       
            resolution={128}
            style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {() => (
              <div className="absolute inset-0 bg-[#05070A]/30 pointer-events-none"></div>
            )}
          </WaterWave>
        </motion.div>
      </div>
      

      <div className="w-full pt-8 px-4 md:px-6 relative z-50 flex justify-center pointer-events-none mb-12">
        
      
        <nav className="pointer-events-auto flex justify-between items-center w-full max-w-6xl bg-[#111620]/40 backdrop-blur-lg border border-gray-700/50 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
       
          <div className="text-2xl font-black flex items-center gap-2 text-white cursor-pointer" onClick={(e) => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="text-yellow-500 font-mono tracking-tighter">{"</>"}</span>
          </div>
          
       
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-xs font-bold tracking-widest text-gray-300">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="relative text-white py-2 group">
              ACCUEIL
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full"></span>
            </a>
            
            <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              À PROPOS
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            
            <a href="#resume" onClick={(e) => { e.preventDefault(); document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              COMPÉTENCES
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              PROJETS
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>

            <a href="#blog" onClick={(e) => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              STAGE
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>

            <a href="#photography" onClick={(e) => { e.preventDefault(); document.getElementById('photography')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              AU-DELÀ DU CODE
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition py-2 group relative">
              CONTACT
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          </div>

      
          <div className="hidden md:flex">
            <a 
              href="/CV_David_Diema.pdf" 
              target="_blank"
              className="flex items-center gap-2 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold text-sm py-1.5 px-5 rounded-lg transition-all duration-300"
            >
              <FaFilePdf size={14} />
              <span>Mon CV</span>
            </a>
          </div>
          
        </nav>
      </div>


      <section className="relative w-full mb-40 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex flex-col items-start z-20 pointer-events-auto"
          >
            <p className="text-yellow-500 text-xl mb-4 font-medium">Bonjour, je suis</p>
            <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight leading-tight drop-shadow-2xl">
              David <br /> Diema
            </h1>
            
            <button 
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-yellow-500 text-black font-bold py-4 px-10 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 mb-16 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              Me Contacter
            </button>

            <div className="flex items-center gap-6 bg-[#111620]/80 backdrop-blur-md px-6 py-4 rounded-full border border-gray-800 shadow-xl">
              <a href="https://github.com/daviddiema7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition group">
                <span className="group-hover:text-yellow-500 transition-colors flex items-center"><FaGithub size={20} /></span> <span className="text-sm font-semibold">GitHub</span>
              </a>
              <a href="https://gitlab.com/daviddiema7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition group">
                <span className="group-hover:text-orange-500 transition-colors flex items-center"><FaGitlab size={20} /></span>
              </a>
              <a href="https://www.linkedin.com/in/david-diema-0520a7294/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition group">
                <span className="group-hover:text-blue-500 transition-colors flex items-center"><FaLinkedin size={20} /></span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
         className="w-full lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45vw] h-[500px] lg:h-[700px] mt-12 lg:mt-20 z-10 pointer-events-auto"
        >
          <Image
            src="/photo_david.png"
            alt="David Diema"
            fill
            className="object-contain object-bottom drop-shadow-2xl" 
            priority 
          />
        </motion.div>
      </section>
     
      <div className="relative w-full bg-[#05070A] z-20 pt-20">
        
 
        <div className="absolute bottom-full left-0 w-full h-[400px] bg-gradient-to-t from-[#05070A] via-[#05070A]/80 to-transparent pointer-events-none"></div>

   
      <section id="about" className="relative py-32 max-w-5xl mx-auto px-6 md:px-12 z-10">
        
        <div className="mb-24 md:mb-32 relative text-center">
          <h2 className="text-yellow-500 text-lg font-bold tracking-widest uppercase mb-2">À propos de moi</h2>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[8rem] font-black text-white/[0.03] uppercase whitespace-nowrap pointer-events-none -z-10">
            À propos de moi
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-10 leading-tight">
            Développeur <span className="text-yellow-500">Full-Stack</span>
          </h3>
          
          <div className="space-y-8 text-gray-400 leading-relaxed text-lg md:text-xl border-l-4 border-gray-800 pl-6 md:pl-10">
            <p>
              Je suis du genre à vouloir comprendre le <strong className="text-white">« pourquoi »</strong> avant de coder le <strong className="text-white">« comment »</strong>. Cette approche me pousse à explorer différentes façons de résoudre un problème avant de me lancer tête baissée dans le code.
            </p>
            <p>
              J'aime apprendre en continu. Il y a toujours une nouvelle technologie à tester, un pattern d'architecture à comprendre, ou une meilleure façon d'optimiser les choses. C'est cette <strong className="text-yellow-500">curiosité technique</strong> et cette envie de bien faire qui me font avancer au quotidien.
            </p>
          </div>
        </div>

      </section>

      <section id="portfolio" className="max-w-7xl mx-auto px-6 relative py-32 z-10">
        <div className="text-center mb-20 relative">
          <h2 className="text-yellow-500 text-lg font-bold tracking-widest relative z-10 uppercase">
            Mes Projets & SAÉ
            <span className="block w-12 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          </h2>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-9xl font-black text-gray-800 opacity-20 z-0 select-none tracking-widest whitespace-nowrap">
            PORTFOLIO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
              onClick={() => setSelectedProject(projet)}
              className="group relative h-[450px] w-full rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 cursor-pointer"
            >
           
              <Image
                src={projet.image} 
                alt={projet.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
        
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                
             
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                  {projet.techs.split('•').map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-[9px] md:text-[10px] font-black tracking-widest text-yellow-500 uppercase bg-yellow-500/10 border border-yellow-500/30 rounded-full backdrop-blur-sm">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-white group-hover:text-yellow-500 transition-colors">
                  {projet.title}
                </h3>
                <p className="text-white/50 text-xs font-bold mb-4 group-hover:text-yellow-500/70 transition-colors">{projet.year}</p>
                
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 line-clamp-3">
                  {projet.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="resume" className="max-w-7xl mx-auto px-6 relative py-32 z-10">
        
  
       <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16">
            
        
            <div className="bg-[#111620]/40 backdrop-blur-md border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h4 className="text-white font-black text-xl 2xl:text-2xl mb-8 border-l-4 border-yellow-500 pl-5 uppercase tracking-wider">
                Frontend & Web
              </h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">React / Next.js</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">TypeScript</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Tailwind CSS</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Framer Motion</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-800/50 px-4 py-1.5 rounded-md">Intermédiaire</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-300 text-base 2xl:text-lg">Dart / Mobile</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-900 px-4 py-1.5 rounded-md">Notions</span>
                </li>
              </ul>
            </div>

       
            <div className="bg-[#111620]/40 backdrop-blur-md border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h4 className="text-white font-black text-xl 2xl:text-2xl mb-8 border-l-4 border-yellow-500 pl-5 uppercase tracking-wider">
                Backend & Serveur
              </h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Python / Django</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Node.js / Express</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Architecture REST / MVT</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">PHP / Symfony</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-800/50 px-4 py-1.5 rounded-md">Intermédiaire</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-300 text-base 2xl:text-lg">C / C++</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest bg-gray-900 px-4 py-1.5 rounded-md">Notions</span>
                </li>
              </ul>
            </div>

            
            <div className="bg-[#111620]/40 backdrop-blur-md border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h4 className="text-white font-black text-xl 2xl:text-2xl mb-8 border-l-4 border-yellow-500 pl-5 uppercase tracking-wider">
                Data & Infrastructure
              </h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Git / Versioning</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">MongoDB / Redis</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">PostgreSQL / SQL</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Docker</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-800/50 px-4 py-1.5 rounded-md">Intermédiaire</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-300 text-base 2xl:text-lg">Linux / Nginx</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-800/50 px-4 py-1.5 rounded-md">Intermédiaire</span>
                </li>
              </ul>
            </div>

            
            <div className="bg-[#111620]/40 backdrop-blur-md border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h4 className="text-white font-black text-xl 2xl:text-2xl mb-8 border-l-4 border-yellow-500 pl-5 uppercase tracking-wider">
                Management & Soft Skills
              </h4>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Travail en Équipe</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Méthodes Agiles (Scrum)</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Maîtrisé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Gestion de Projet</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800/50 pb-4">
                  <span className="text-gray-300 text-base 2xl:text-lg">Résolution de Problèmes</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-300 text-base 2xl:text-lg">Autonomie & Veille</span>
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-md">Avancé</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-[#111620]/50 backdrop-blur-md border border-gray-800 rounded-[2.5rem] p-8 md:p-16 overflow-x-auto shadow-2xl">
            <div className="mb-12">
              <h3 className="text-3xl font-black text-white mb-3 border-l-4 border-yellow-500 pl-5 uppercase tracking-wide">
                AUTO-Évalation
              </h3>
              <p className="text-gray-400 text-sm ml-6">
                 Anayse de mes acquis et de ma monté compétence
              </p>
            </div>
            
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b-2 border-gray-800 text-gray-400 uppercase text-sm font-bold tracking-widest">
                  <th className="pb-8 pr-8 w-1/4">Compétences du BUT</th>
                  <th className="pb-8 pr-8 w-1/4">Traces d'apprentissage</th>
                  <th className="pb-8 w-1/2">Analyse de la compétence</th>
                </tr>
              </thead>
              <tbody className="text-base">
                
           
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/40 transition-colors group">
                  <td className="py-12 pr-8 align-top">
                    <span className="text-yellow-500 font-bold text-sm block mb-2 tracking-widest">UE51 - COMPÉTENCE 1</span>
                    <span className="text-white font-black block mb-2 text-xl group-hover:text-yellow-500 transition-colors leading-tight">Réaliser un développement d'application</span>
                  </td>
                  <td className="py-12 pr-8 align-top">
                    <div className="space-y-5">
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Stage Qionis</span>
                        <span className="text-gray-300 text-sm">Refonte Upger (Modèle MVT, OAuth2)</span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Projet Ultimate Neon Space</span>
                        <span className="text-gray-300 text-xs">Moteur graphique 2D, Python</span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Stage Reeway</span>
                        <span className="text-gray-300 text-sm">Développment d'une application d'incubateur de talents(React,Nexts.js)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-12 align-top">
                    <div className="space-y-5 text-base">
                      <div>
                        <strong className="text-gray-300 block mb-2">Difficulté :</strong>
                        <p className="text-gray-400 leading-relaxed">
                          En arrivant en première année, je partais vraiment de zéro. Je n'avais jamais écrit une ligne de code et tout me paraissait compliqué. J'avais du mal à comprendre la logique même de la programmation. En plus comme dès la première année nous apprenions plusieurs langage, c'était difficile de comprendre les concepts et de retenir toutes les syntaxes propres à chacun d'entre eux.
                        </p>
                      </div>
                      <div>
                        <strong className="text-gray-300 block mb-2">Évolution :</strong>
                        <p className="text-gray-400 leading-relaxed">
                          J'ai dû faire beaucoup de travail personnel pour monter en compétence. Je pense que c'est lors de ma deuxième année que j'ai commencé à me sentir plus à l'aise. J'ai eu un vrai déclic lors de mon stage chez Reewayy en deuxième année qui a été ma première expérience professionel, où j'ai pu faire du développement web avec React et commencer à prendre mes marques. Comme j'étais encadrés par un chef de projet, j'ai pu lui poser beaucoup de questions et lui parler de mes difficulté. 
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 leading-relaxed">
                          Il m'a donné plusieurs exercice de base au début pour que je comprenne ce qu'on attendait de moi. Il m'a également conseillé de faire des projets chez moi pour apprendre plus facilement. Jusqu'à maintenant, c'est ce que je fais, je travaille toujours sur un projet et je demande souvent à mes proches s'ils ont des idées, ou des projets à me confier. C'est grâce à sa que je suis à l'aise avec beaucoup de languages maintenant.
                        </p>
                      </div>
                      <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-5 mt-6 rounded-r-xl">
                        <strong className="text-yellow-500 block mb-2">Bilan des acquis :</strong>
                        <p className="text-gray-300">
                          Aujourd'hui je sais construire des architectures propres, comprendre un contexte métier avant de coder, sécuriser des données et tester mon code. Je pars plus de zéro à chaque nouveau langage parce que j'ai compris que la logique de programmation reste la même, c'est juste la syntaxe qui change. Mes points à améliorer sont la sécurisation du code et la conception d'architecture plus complexe
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>

          
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/40 transition-colors group">
                  <td className="py-12 pr-8 align-top">
                    <span className="text-yellow-500 font-bold text-sm block mb-2 tracking-widest">UE52 - COMPÉTENCE 2</span>
                    <span className="text-white font-black block mb-2 text-xl group-hover:text-yellow-500 transition-colors leading-tight">Optimiser des applications informatiques</span>
                  </td>
                  <td className="py-12 pr-8 align-top">
                    <div className="space-y-5">
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Plateforme de Stages</span>
                        <span className="text-gray-300 text-sm">Optimisation de base de données</span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">UberEats Simulation</span>
                        <span className="text-gray-300 text-sm">Gestion asynchrone et transactions NoSQL </span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Projet Ultimate Neon Space</span>
                        <span className="text-gray-300 text-sm">Vectorisation matricielle</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-12 align-top">
                    <div className="space-y-5 text-base">
                      <div>
                        <strong className="text-gray-300 block mb-2">Difficulté :</strong>
                        <p className="text-gray-400 leading-relaxed"> Avant, je ne comprenais pas vraiment l'intêret de l'optimisation. Quand mon code tournait, pour moi c'était bon, j'avais pas le réflexe de me demander est-ce que cette requête est efficace, est-ce que cet algorithme pourrait être meilleur. En fait je mesurais pas l'impact réel que ça pouvait avoir. </p>
                      </div>
                      <div>
                        <p className="text-gray-400 leading-relaxed"> Et ça s'est vraiment vu sur la SAÉ application mobile en BUT3. On avait une première version de l'appli qui était lente, et on a mis du temps avant d'identifier vraiment d'où ça venait. J'avais aussi une mauvaise interprétation initiale de la consigne d'optimisation sur ce projet, du coup j'ai perdu du temps à aller dans une mauvaise direction.</p>
                      </div>
                      <div>
                        <p className="text-gray-400 leading-relaxed"> Pendant mon stage de troisième année chez Qionis, j'ai réalisé que je faisais pas vraiment attention à mes requêtes de données au début, je les écrivais pour que ça fonctionne et c'est tout. C'est là que j'ai commencé à comprendre que optimiser ça fait partie du développement, c'est pas quelque chose qu'on fait après si on a le temps. </p>
                      </div>
                      <div>
                        <strong className="text-gray-300 block mb-2">Évolution :</strong>
                        <p className="text-gray-400 leading-relaxed">Ce que je retiens c'est que j'ai progressé en pratiquant. Depuis mon stage chez Qionis, j'ai pris l'habitude d'optimiser mes requêtes de données et de comprendre les consignes avant de coder, pour pas me retrouver à tout refaire après. Sur la SAÉ mobile, même si on a eu du mal, le fait d'identifier les points de blocage et d'accepter qu'il fallait réécrire une partie de la logique c'était déjà une vraie évolution par rapport à moi en première année qui voulait jamais toucher à un code qui marchait. Il me reste encore beaucoup à apprendre je le sais, mais la différence c'est que maintenant je connais mes points faible et je sais ce que je dois faire pour les corriger.</p>
                      </div>
                      <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-5 mt-6 rounded-r-xl">
                        <strong className="text-yellow-500 block mb-2">Bilan des acquis :</strong>
                        <p className="text-gray-300">J'ai acquis une façon de penser différente. Maintenant j'ai le reflexe de me demander comment ça marche, à quel coût, et est ce que on peut l'améliorer. Ducoup sa me permet de commencer un projet en pensant déjà à la performance et pas juste aux fonctionnalité.</p>
                      </div>
                    </div>
                  </td>
                </tr>

            
                <tr className="hover:bg-gray-900/40 transition-colors group">
                  <td className="py-12 pr-8 align-top">
                    <span className="text-yellow-500 font-bold text-sm block mb-2 tracking-widest">UE45 - COMPÉTENCE 5</span>
                    <span className="text-white font-black block mb-2 text-xl group-hover:text-yellow-500 transition-colors leading-tight">Conduire un projet</span>
                  </td>
                  <td className="py-12 pr-8 align-top">
                    <div className="space-y-5">
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">Stage Qionis</span>
                        <span className="text-gray-300 text-sm">Pilotage de la refonte Upger de l'audit jusqu'à la mise en production</span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">SAÉ 24h de l'Info</span>
                        <span className="text-gray-300 text-sm">Gestion organisation événementielle</span>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                        <span className="text-yellow-500 font-bold text-sm block mb-1">SAÉ application de recommandation recettes </span>
                        <span className="text-gray-300 text-sm">Pilotage du projet, gestions des imprévus et déploiement</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-12 align-top">
                    <div className="space-y-5 text-base">
                      <div>
                        <strong className="text-gray-300 block mb-2">Difficulté :</strong>
                        <p className="text-gray-400 leading-relaxed">Conduire un projet c'était quelque chose qui me paraissait simple en théorie mais qui est beaucoup plus compliqué dans la réalité. Ma première vraie difficulté c'était l'organisation au sein du groupe. Quand un membre de l'équipe pouvait pas venir à l'université pour avancer sur les SAE, il fallait trouver comment continuer sans le perdre, lui faire un débrief de ce qui avait été fait, ce qu'il lui restait à faire, sans que ça crée de décalage dans l'avancement global. C'était pas évident parce que j'avais tendance à vouloir avancer vite et parfois on oublies de maintenir tout le monde à jour.</p>
                      </div>
                       <div>
                        <p className="text-gray-400 leading-relaxed">Il y avait aussi la gestion des conflits, des désaccords sur une architecture, sur une fonctionnalité à prioriser, ou juste la frustration qui monte quand quelque chose bloque depuis trop longtemps. Et anticiper les imprévus c'était vraiment quelque chose que je savais pas faire au début, je réagissais aux problèmes plutôt que de les prévoir.</p>
                      </div>
                      <div>
                        <strong className="text-gray-300 block mb-2">Évolution :</strong>
                        <p className="text-gray-400 leading-relaxed">J'ai progressé en comprenant l'importance de structurer le projet dès le début. J'ai aussi compris que pour réussir un projet il est nécessaire de savoir communiquer correctement. Par exemple avec des réunions qui permettent à tout le monde de rester synchronisé, de débloquer ce qui coince et d'anticiper ce qui pourrait poser problème. J'ai aussi appris à utiliser des outils de planification comme Gantt ou des outils comme Jira et Freedcamp pour découper le projet en tâches avec des échéances, ce qui permettait de ne pas se retrouver à tout gérer dans l'urgence au dernier moment. J'ai appris à gérer les conflits et les désaccord mais aussi à réduire la frustrations qui peut s'accumuler durant un projet. </p>
                      </div>
                      <div className="bg-yellow-500/10 border-l-2 border-yellow-500 p-5 mt-6 rounded-r-xl">
                        <strong className="text-yellow-500 block mb-2">Bilan des acquis :</strong>
                        <p className="text-gray-300"> Aujourd'hui, je me sens plus à l'aise pour structurer un projet, répartir les rôles, anticiper les imprévus et maintenir une cohésion d'équipe. J'ai compris l'importance de la communication au sein d'un groupe. Ce qu'il me reste à travailler c'est la gestion des priorités.</p>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="blog" className="max-w-[1800px] mx-auto px-6 md:px-12 relative py-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          <div className="lg:col-span-4">
            <h2 className="text-yellow-500 text-lg font-bold tracking-widest uppercase mb-4">Immersion Professionnelle</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-8 text-white uppercase leading-tight">Mon Stage BUT 3</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-900/40 p-6 md:p-8 rounded-3xl border-l-4 border-yellow-500 shadow-2xl">
                <p className="text-white font-bold mb-3 uppercase tracking-wide text-lg">Ce dont je suis le plus fier</p>
                <p className="text-gray-400 text-base italic leading-relaxed">
                  "Avoir remis en route un logiel de suivi de sauvegarde et le voir utilisé par toute l'équipe technique. J'ai pris plaisir à voir que mon travail pouvait impacter une entreprise."
                </p>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed text-base">
                <p>
                  <strong className="text-yellow-500 block mb-1">Culture d'entreprise :</strong> J'ai pu voir comment on gère un projet et, surtout comment on communique avec les différentes équipes et services d'une entreprise. J'ai beaucoup aimé les réunions hebdomadaire, qui me permettaient de faire le point avec l'equipe sur mes avancées et mes diifcultés.
                </p>
                <p>
                  <strong className="text-yellow-500 block mb-1">Ma découverte personnelle :</strong> J'ai aussi pu découvrir le no-code avec n8n, c'est une technologie que je voulais tester depuis longtemps sans en avoir eu l'occasion.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="h-[500px] 2xl:h-[700px] bg-gray-900 rounded-[2rem] overflow-hidden relative border border-gray-800 group shadow-2xl">
                 <Image src="/cds-1.jpeg" alt="Espace de travail CDS" fill unoptimized priority className="object-cover subpixel-antialiased transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                 <span className="absolute bottom-6 left-6 text-sm md:text-base font-black text-white uppercase tracking-wider z-10">Espace de travail CDS</span>
              </div>
              <div className="h-[350px] 2xl:h-[500px] bg-gray-900 rounded-[2rem] overflow-hidden relative border border-gray-800 group shadow-2xl">
                 <Image src="/salle_de_reunion.jpeg" alt="Salle de réunion" fill unoptimized priority className="object-cover subpixel-antialiased transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                 <span className="absolute bottom-6 left-6 text-sm md:text-base font-black text-white uppercase tracking-wider z-10">Salle de réunion</span>
              </div>
            </div>
            
            <div className="pt-24 2xl:pt-32 space-y-8">
              <div className="h-[350px] 2xl:h-[500px] bg-gray-900 rounded-[2rem] overflow-hidden relative border border-gray-800 group shadow-2xl">
                 <Image src="/salle _de_pause.jpeg" alt="Vue globale du CDS" fill unoptimized priority className="object-cover subpixel-antialiased transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                 <span className="absolute bottom-6 left-6 text-sm md:text-base font-black text-white uppercase tracking-wider z-10">Salle de pause</span>
              </div>
              <div className="h-[500px] 2xl:h-[700px] bg-gray-900 rounded-[2rem] overflow-hidden relative border border-gray-800 group shadow-2xl">
                 <Image src="/espace_detente.jpeg" alt="Espace détente" fill unoptimized priority className="object-cover subpixel-antialiased transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                 <span className="absolute bottom-6 left-6 text-sm md:text-base font-black text-white uppercase tracking-wider z-10">Espace détente</span>
              </div>
            </div>
          </div>

        </div>
      </section>

   
      <section className="max-w-[1600px] mx-auto px-6 relative py-32 z-10 border-t border-gray-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          
        
          <div className="space-y-8">
            <h4 className="text-white font-black text-2xl 2xl:text-3xl uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1.5 bg-yellow-500"></span> Veille Techno
            </h4>
            <p className="text-gray-400 text-base 2xl:text-lg leading-relaxed">
              Je suis les évolutions technologique via <strong>Medium</strong> et <strong>Dev.to</strong>. C'est par ce biais que j'ai découvert Framer Motion et la librairie Lenis pour ce portfolio.
            </p>
          </div>

      
          <div className="space-y-8">
            <h4 className="text-white font-black text-2xl 2xl:text-3xl uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1.5 bg-yellow-500"></span> Poursuite d'études
            </h4>
            <p className="text-gray-400 text-base 2xl:text-lg leading-relaxed">
              Dans la continuité de mon BUT, j'aspire à intégrer un <strong>Cycle Ingénieur en Data, Intelligence Artificielle et Big Data </strong>. Cette fillière m'attire parceque lors de mon stage j'avais commencer à intégré un système de génération de devis automatisée couplé à l'IA dans un projet annexe. Durant le projet j'ai réalisé que ce domaine m'intéressait vraiment et que je voulais appronfondir mes connaissances. 
            </p>
          </div>

     
          <div className="space-y-8">
            <h4 className="text-white font-black text-2xl 2xl:text-3xl uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1.5 bg-yellow-500"></span> Mes Objectifs
            </h4>
            <ul className="text-gray-400 text-base 2xl:text-lg space-y-4">
             <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">✦</span> 
                <span><strong className="text-white">Court terme :</strong> Valider mon BUT.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">✦</span> 
                <span><strong className="text-white">Moyen terme :</strong> Poursuivre mes études en Cycle ingénieur en spécialité data et machine learning.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">✦</span> 
                <span><strong className="text-white">Moyen terme :</strong> Poursuivre mes études en Cycle ingénieur en spécialité data et machine learning.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">✦</span> 
                <span><strong className="text-white">Long terme :</strong> Créer ma propre société de développement.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
  
      <section id="photography" className="w-full mx-auto px-4 md:px-12 relative py-32 z-10 border-t border-gray-800/50 overflow-hidden">
        
        <div className="text-center mb-16 relative">
          <h2 className="text-yellow-500 text-lg font-bold tracking-widest relative z-10 uppercase">
            AU-DELÀ DU CODE
            <span className="block w-12 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          </h2>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl font-black text-white opacity-5 z-0 select-none tracking-widest whitespace-nowrap">
            MOODBOARD
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="text-gray-400 text-lg leading-relaxed">
            Voici quelques clichés que j'ai pu capturer au fil du temps, des objets et des endroits qui m'ont marqué.
          </p>
        </div>

       <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-16 md:gap-x-16 md:gap-y-28 py-20 w-full max-w-[1800px] mx-auto">
          {[
            { id: 1, rot: "rotate-[-6deg]", trans: "md:-mt-16 z-10", desc: "Kingasani" },
            { id: 2, rot: "rotate-[4deg]", trans: "md:mt-24 md:-ml-16 z-20", desc: "Tour de l'Échangeur de Limete" },
            { id: 3, rot: "rotate-[-3deg]", trans: "md:-mt-12 md:ml-10 z-30", desc: "Kimbanseke" },
            { id: 4, rot: "rotate-[7deg]", trans: "md:mt-16 md:-ml-20 z-10", desc: "Avenue Nzazi" },
            { id: 5, rot: "rotate-[-5deg]", trans: "md:-mt-20 z-20", desc: "Patrice Lumumba" },
            { id: 6, rot: "rotate-[3deg]", trans: "md:mt-32 md:-ml-12 z-30", desc: "Patrice Lumumba" },
            { id: 7, rot: "rotate-[-8deg]", trans: "md:-mt-16 md:ml-16 z-10", desc: "Colonel Mamadou Ndala" },
            { id: 8, rot: "rotate-[5deg]", trans: "md:mt-20 md:-ml-16 z-40", desc: "Le trône du Léopard" },
            { id: 9, rot: "rotate-[-4deg]", trans: "md:-mt-32 z-20", desc: "Le Président Kasa-Vubu, Lumumba et Mobutu" },
            { id: 10, rot: "rotate-[6deg]", trans: "md:mt-24 md:-ml-16 z-30", desc: "Simon Kimbangu et Patrice Lumumba" },
            { id: 11, rot: "rotate-[-2deg]", trans: "md:-mt-16 md:ml-12 z-10", desc: "Statue de Mobutu" },
            { id: 12, rot: "rotate-[8deg]", trans: "md:mt-20 md:-ml-20 z-20", desc: "Tableau de Mobutu" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item.id)}
              className={`relative group cursor-pointer bg-[#F4F4F5] p-4 md:p-5 pb-14 md:pb-20 rounded-sm shadow-2xl border border-gray-300 transform-gpu transition-transform duration-300 ease-out hover:z-50 hover:scale-105 hover:rotate-0 will-change-transform ${item.rot} ${item.trans}`}
            >
              <div className="relative w-64 h-80 md:w-[26rem] md:h-[36rem] overflow-hidden border border-gray-200 bg-gray-200 pointer-events-none">
                <img
                  src={`/photo-${item.id}.jpg`}
                  alt={item.desc}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-110 will-change-transform"
                />
              </div>
              
              <div className="absolute bottom-5 md:bottom-7 left-0 w-full text-center px-4 pointer-events-none">
                <span className="text-gray-800 font-serif italic text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-2">
                  {item.desc}
                  <span className="opacity-0 group-hover:opacity-100 text-yellow-600 transition-opacity">⤢</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
   
      <section id="contact" className="max-w-7xl mx-auto px-6 relative py-32 z-10 border-t border-gray-800/50 mt-20">
        
       
        <div className="text-center mb-16 relative">
          <h2 className="text-yellow-500 text-lg font-bold tracking-widest relative z-10 uppercase">
            Ce qu'ils disent de moi
            <span className="block w-12 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          </h2>
        </div>

     
        <div className="max-w-4xl mx-auto mb-32 flex justify-center w-full">
          {/* Témoignage Unique */}
          <div className="bg-[#111620]/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-gray-800 relative shadow-2xl w-full">
            <span className="text-6xl text-yellow-500/20 absolute top-4 left-6 font-serif">"</span>
            <div className="text-gray-300 text-base leading-relaxed mb-8 relative z-10 pt-4 space-y-4">
              <p>
                Travailler avec David est un réel plaisir. J’ai particulièrement apprécié son sérieux, son implication et sa capacité à apprendre rapidement. Au-delà de ses qualités professionnelles, c’est une personne fiable, respectueuse et investie sur qui l’on peut compter.
              </p>
              <p>
                Tout au long de son expérience dans l’entreprise, il a fait preuve de curiosité, de professionnalisme et d’une réelle volonté de bien faire. Il a su s’intégrer facilement à l’équipe, prendre en compte les remarques qui lui étaient formulées et mener les missions confiées avec rigueur.
              </p>
            </div>
            <div className="flex items-center gap-5 border-t border-gray-800/50 pt-6">
              <div className="w-14 h-14 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <FaUserTie size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Jimmy Pyram</h4>
                <p className="text-yellow-500 text-sm">Directeur de Qionis</p>
              </div>
            </div>
          </div>
        </div>
      

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
          
         
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">On en discute ?</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Je suis actuellement à la recherche d'une alternance pour mon Cycle Ingénieur en Data & IA à la rentrée prochaine. Si mon profil correspond à ce que vous cherchez, ou si vous avez simplement une question sur mon parcours, n'hésitez pas à m'écrire.
              </p>
            </div>

            <div className="space-y-6">
            
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#111620] border border-gray-800 rounded-lg flex items-center justify-center text-yellow-500 group-hover:border-yellow-500 transition-colors">
                  <span className="text-xl">@</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Email Professionnel</p>
                  <p className="text-white">diemadavid1@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#111620] border border-gray-800 rounded-lg flex items-center justify-center text-yellow-500 group-hover:border-yellow-500 transition-colors">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/david-diema-0520a7294/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-yellow-500 transition-colors"
                  >
                    linkedin.com/in/david-diema
                  </a>
                </div>
              </div>
            </div>

           
            <div className="pt-6">
              <a 
                href="/CV_David_Diema.pdf" 
                target="_blank"
                className="inline-flex items-center gap-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <FaFilePdf size={20} />
                <span>Télécharger mon CV</span>
                <span className="opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">→</span>
              </a>
            </div>
          </div>

        
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111620]/40 backdrop-blur-xl border border-gray-800 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group/form"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2 group">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase ml-1 group-focus-within:text-yellow-500 transition-colors duration-300">Nom complet</label>
                  <input 
                    id="name"
                    type="text" 
                    name="name"
                    placeholder="Votre nom" 
                    className="w-full bg-[#0A0E17] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase ml-1 group-focus-within:text-yellow-500 transition-colors duration-300">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="votre.email@exemple.com" 
                    className="w-full bg-[#0A0E17] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase ml-1 group-focus-within:text-yellow-500 transition-colors duration-300">Sujet</label>
                <input 
                  id="subject"
                  type="text" 
                  name="subject"
                  placeholder="Opportunité d'alternance / Cycle Ingénieur" 
                  className="w-full bg-[#0A0E17] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase ml-1 group-focus-within:text-yellow-500 transition-colors duration-300">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={5} 
                  placeholder="Bonjour David, j'aimerais échanger avec vous concernant..." 
                  className="w-full bg-[#0A0E17] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full font-black py-4 rounded-xl transition-all duration-300 transform flex justify-center items-center gap-3 group/btn ${
                  isSent 
                    ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-100 border border-green-400" 
                    : "bg-yellow-500 text-black hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(234,179,8,0.3)] border border-yellow-400"
                } ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : isSent ? (
                  "✔ Message envoyé avec succès !"
                ) : (
                  <>
                    Envoyer le message 
                    <span className="text-lg leading-none transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
        
       
        <div className="text-center text-gray-600 text-xs mt-16 pb-8 font-medium">
          © 2026 David Diema - Portfolio BUT 3 Informatique. Tous droits réservés.
        </div>
      </section>

      </div>

    </main>
  );
}