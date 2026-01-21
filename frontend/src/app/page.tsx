// // // src/app/page.tsx

// // "use client";

// // import FaucetComponent from "@/components/Faucet";
// // import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// // import dynamic from "next/dynamic";
// // import { useEffect, useState } from "react";

// // const WalletMultiButtonDynamic = dynamic(
// //   async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
// //   { ssr: false }
// // );
// // // A simple Solana Logo component
// // const SolanaLogo = () => (
// //   <svg width="150" height="35" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
// //       <path d="M57.587 31.332c0-11.86-9.62-21.48-21.48-21.48H0v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H0v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
// //       <path d="M114.734 31.332c0-11.86-9.62-21.48-21.48-21.48H57.147v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H57.147v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
// //       <path d="M172.082 9.852h-6.89v43.26h6.89V9.852zM210.982 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
// //       <path d="M191.532 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
// //       <path d="M248.818 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
// //       <path d="M282.498 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
// //   </svg>
// // );

// // // Particle component for background effect
// // const Particle = ({ style }: { style: React.CSSProperties }) => (
// //   <div className="particle" style={style} />
// // );

// // export default function Home() {
// //   const [particles, setParticles] = useState<React.CSSProperties[]>([]);

// //   useEffect(() => {
// //     // Create 50 random particles
// //     const newParticles = Array.from({ length: 50 }, () => ({
// //       left: `${Math.random() * 100}%`,
// //       top: `${Math.random() * 100}%`,
// //       animationDuration: `${Math.random() * 3 + 2}s`,
// //       animationDelay: `${Math.random() * 2}s`,
// //     }));
// //     setParticles(newParticles);
// //   }, []);

// //   return (
// //     <div style={styles.container}>
// //       {particles.map((style, i) => (
// //         <Particle key={i} style={style} />
// //       ))}
// //       <div style={styles.gradient} />
// //       <header style={styles.header}>
// //         <div style={styles.logoWrapper} className="logo-wrapper">
// //           <SolanaLogo />
// //         </div>
// //         <WalletMultiButton />
// //       </header>

// //       <main style={styles.main}>
// //         <div style={styles.card} className="card-container">
// //           <h1 style={styles.title}>Token Faucet</h1>
// //           <p style={styles.subtitle}>Get devnet tokens for testing</p>
// //           <div style={styles.faucetWrapper}>
// //             <FaucetComponent />
// //           </div>
// //         </div>
// //       </main>

// //       <style jsx global>{`
// //         .particle {
// //           position: absolute;
// //           width: 5px;
// //           height: 5px;
// //           background: rgba(255, 255, 255, 0.1);
// //           border-radius: 50%;
// //           pointer-events: none;
// //           animation: float linear infinite;
// //         }

// //         .logo-wrapper:hover {
// //           transform: scale(1.05);
// //         }

// //         .card-container:hover {
// //           transform: translateY(-5px) !important;
// //           box-shadow: 0 0 60px rgba(0, 255, 255, 0.2), 0 0 100px rgba(0, 255, 255, 0.1) !important;
// //         }

// //         @keyframes float {
// //           0% { transform: translateY(0) rotate(0deg); opacity: 0; }
// //           50% { opacity: 0.8; }
// //           100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
// //         }

// //         @keyframes gradient {
// //           0% { background-position: 0% 50%; }
// //           50% { background-position: 100% 50%; }
// //           100% { background-position: 0% 50%; }
// //         }

// //         @keyframes shimmer {
// //           0% { background-position: -200% 50%; }
// //           100% { background-position: 200% 50%; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // const styles: { [key: string]: React.CSSProperties } = {
// //   container: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     minHeight: '100vh',
// //     backgroundColor: '#0a0a0f',
// //     padding: '2rem',
// //     position: 'relative',
// //     overflow: 'hidden',
// //   },
// //   gradient: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     background: 'linear-gradient(-45deg, #00ff8855, #00ffaa55, #00a8ff55, #9d00ff55)',
// //     backgroundSize: '400% 400%',
// //     animation: 'gradient 15s ease infinite',
// //     zIndex: 1,
// //   },
// //   header: {
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     width: '100%',
// //     maxWidth: '1200px',
// //     margin: '0 auto',
// //     position: 'relative',
// //     zIndex: 2,
// //   },
// //   logoWrapper: {
// //     transition: 'transform 0.3s ease',
// //   },
// //   main: {
// //     flex: 1,
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     position: 'relative',
// //     zIndex: 2,
// //   },
// //   card: {
// //     background: 'rgba(255, 255, 255, 0.05)',
// //     backdropFilter: 'blur(10px)',
// //     padding: '2.5rem',
// //     borderRadius: '12px',
// //     border: '1px solid rgba(255, 255, 255, 0.1)',
// //     textAlign: 'center',
// //     boxShadow: `
// //       0 0 40px rgba(0, 255, 255, 0.1),
// //       0 0 80px rgba(0, 255, 255, 0.05)
// //     `,
// //     width: '100%',
// //     maxWidth: '450px',
// //     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //   },
// //   title: {
// //     fontSize: '2rem',
// //     fontWeight: 'bold',
// //     marginBottom: '0.5rem',
// //     background: 'linear-gradient(90deg, #fff, #7dd3fc, #fff)',
// //     backgroundSize: '200% auto',
// //     backgroundClip: 'text',
// //     WebkitBackgroundClip: 'text',
// //     WebkitTextFillColor: 'transparent',
// //     animation: 'shimmer 3s linear infinite',
// //   },
// //   subtitle: {
// //     color: 'rgba(255, 255, 255, 0.7)',
// //     marginBottom: '2rem',
// //   },
// //   faucetWrapper: {
// //     marginTop: '1.5rem',
// //   },
// // };



// "use client";

// import { FaucetComponent } from "@/components/Faucet";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic"; // 1. Import dynamic
// import AdminDashboard from "@/components/Admin";
// import Link from "next/link";

// // 2. Create a Client-Side only version of the Wallet Button
// // This prevents the "Hydration failed" error entirely
// const WalletMultiButtonDynamic = dynamic(
//   async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
//   { ssr: false }
// );

// const SolanaLogo = () => (
//   <svg width="150" height="35" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M57.587 31.332c0-11.86-9.62-21.48-21.48-21.48H0v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H0v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
//       <path d="M114.734 31.332c0-11.86-9.62-21.48-21.48-21.48H57.147v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H57.147v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
//       <path d="M172.082 9.852h-6.89v43.26h6.89V9.852zM210.982 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
//       <path d="M191.532 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
//       <path d="M248.818 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
//       <path d="M282.498 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
//   </svg>
// );

// const Particle = ({ style }: { style: React.CSSProperties }) => (
//   <div className="particle" style={style} />
// );

// export default function Home() {
//   const [particles, setParticles] = useState<React.CSSProperties[]>([]);

//   useEffect(() => {
//     const newParticles = Array.from({ length: 50 }, () => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       animationDuration: `${Math.random() * 3 + 2}s`,
//       animationDelay: `${Math.random() * 2}s`,
//     }));
//     setParticles(newParticles);
//   }, []);

//   return (
//     <div style={styles.container}>
//       {particles.map((style, i) => (
//         <Particle key={i} style={style} />
//       ))}
//       <div style={styles.gradient} />
//       <header style={styles.header}>
//         <div style={styles.logoWrapper} className="logo-wrapper">
//           <SolanaLogo />
//         </div>
//         {/* 3. Use the Dynamic Button here */}
//         <WalletMultiButtonDynamic />
//       </header>

//       <main style={styles.main}>
//         <div style={styles.card} className="card-container">
//           <h1 style={styles.title}>Token Faucet</h1>
//           <p style={styles.subtitle}>Get devnet tokens for testing</p>
//           <div style={styles.faucetWrapper}>
//             <FaucetComponent />
//           </div>
//         </div>
//       </main>
      
//       {/* ... (Keep your <style jsx global> block here exactly as it was) ... */}
//       <style jsx global>{`
//         .particle {
//           position: absolute;
//           width: 5px;
//           height: 5px;
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 50%;
//           pointer-events: none;
//           animation: float linear infinite;
//         }

//         .logo-wrapper:hover {
//           transform: scale(1.05);
//         }

//         .card-container:hover {
//           transform: translateY(-5px) !important;
//           box-shadow: 0 0 60px rgba(0, 255, 255, 0.2), 0 0 100px rgba(0, 255, 255, 0.1) !important;
//         }

//         @keyframes float {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0; }
//           50% { opacity: 0.8; }
//           100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
//         }

//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes shimmer {
//           0% { background-position: -200% 50%; }
//           100% { background-position: 200% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// }


// // ... (Keep your const styles object here exactly as it was) ...
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: '#0a0a0f',
//     padding: '2rem',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   gradient: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'linear-gradient(-45deg, #00ff8855, #00ffaa55, #00a8ff55, #9d00ff55)',
//     backgroundSize: '400% 400%',
//     animation: 'gradient 15s ease infinite',
//     zIndex: 1,
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     position: 'relative',
//     zIndex: 50,
//   },
//   logoWrapper: {
//     transition: 'transform 0.3s ease',
//   },
//   main: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     zIndex: 2,
//   },
//   card: {
//     background: 'rgba(255, 255, 255, 0.05)',
//     backdropFilter: 'blur(10px)',
//     padding: '2.5rem',
//     borderRadius: '12px',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     textAlign: 'center',
//     boxShadow: `
//       0 0 40px rgba(0, 255, 255, 0.1),
//       0 0 80px rgba(0, 255, 255, 0.05)
//     `,
//     width: '100%',
//     maxWidth: '450px',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   },
//   title: {
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     marginBottom: '0.5rem',
//     background: 'linear-gradient(90deg, #fff, #7dd3fc, #fff)',
//     backgroundSize: '200% auto',
//     backgroundClip: 'text',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     animation: 'shimmer 3s linear infinite',
//   },
//   subtitle: {
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginBottom: '2rem',
//   },
//   faucetWrapper: {
//     marginTop: '1.5rem',
//   },
// };



"use client";

// --- FIX 1: Use curly braces because Faucet.tsx has a named export ---
import { FaucetComponent } from "@/components/Faucet";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; // Required for the admin link


// 2. Create a Client-Side only version of the Wallet Button
// This prevents the "Hydration failed" error entirely
const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const SolanaLogo = () => (
  <svg width="150" height="35" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.587 31.332c0-11.86-9.62-21.48-21.48-21.48H0v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H0v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
      <path d="M114.734 31.332c0-11.86-9.62-21.48-21.48-21.48H57.147v6.89h36.107c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59H57.147v6.89h36.107c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
      <path d="M172.082 9.852h-6.89v43.26h6.89V9.852zM210.982 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
      <path d="M191.532 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
      <path d="M248.818 31.432c0-11.86-9.62-21.48-21.48-21.48h-36.11v6.89h36.11c8.01 0 14.59 6.57 14.59 14.59s-6.57 14.59-14.59 14.59h-36.11v6.89h36.11c11.86 0 21.48-9.62 21.48-21.48z" fill="#fff"></path>
      <path d="M282.498 9.852h-6.89v43.26h6.89V9.852z" fill="#fff"></path>
  </svg>
);

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="particle" style={style} />
);

export default function Home() {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={styles.container}>
      {particles.map((style, i) => (
        <Particle key={i} style={style} />
      ))}
      <div style={styles.gradient} />
      <header style={styles.header}>
        <div style={styles.logoWrapper} className="logo-wrapper">
          <SolanaLogo />
        </div>
        {/* 3. Use the Dynamic Button here */}
        <WalletMultiButtonDynamic />
      </header>

      <main style={styles.main}>
        <div style={styles.card} className="card-container">
          <h1 style={styles.title}>Token Faucet</h1>
          <p style={styles.subtitle}>Get devnet tokens for testing</p>
          <div style={styles.faucetWrapper}>
            <FaucetComponent />
          </div>
        </div>
      </main>

      {/* --- Added Admin Link --- */}
      <footer style={{ position: 'relative', zIndex: 10, marginTop: 'auto', padding: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textAlign: 'center' }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin Portal</Link>
      </footer>

      {/* ... (Keep your <style jsx global> block here exactly as it was) ... */}
      <style jsx global>{`
        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
        }

        .logo-wrapper:hover {
          transform: scale(1.05);
        }

        .card-container:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 0 60px rgba(0, 255, 255, 0.2), 0 0 100px rgba(0, 255, 255, 0.1) !important;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}


// ... (Keep your const styles object here exactly as it was) ...
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(-45deg, #00ff8855, #00ffaa55, #00a8ff55, #9d00ff55)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 50,
  },
  logoWrapper: {
    transition: 'transform 0.3s ease',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    boxShadow: `
      0 0 40px rgba(0, 255, 255, 0.1),
      0 0 80px rgba(0, 255, 255, 0.05)
    `,
    width: '100%',
    maxWidth: '450px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    background: 'linear-gradient(90deg, #fff, #7dd3fc, #fff)',
    backgroundSize: '200% auto',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shimmer 3s linear infinite',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '2rem',
  },
  faucetWrapper: {
    marginTop: '1.5rem',
  },
};