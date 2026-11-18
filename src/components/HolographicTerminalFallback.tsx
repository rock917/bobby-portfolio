export default function HolographicTerminalFallback() {
  return (
    <div className="holo-terminal-fallback" aria-label="Terminal Preview">
      <div className="holo-fallback-header">
        <span className="dot dot-gold" />
        <span className="dot dot-amber" />
        <span className="dot dot-indigo" />
        <span className="title">OBSERVATORY://COSMIC-STATION // BOBBY.AHIRWAR</span>
        <span className="status">[ ONLINE ]</span>
      </div>
      <div className="holo-fallback-body">
        <p className="cmd">
          <span className="prompt">$ </span>whoami
        </p>
        <p className="name">Bobby Ahirwar</p>
        <p className="sub">&gt; Final-Year Undergraduate @ IIT Hyderabad</p>
        <p className="sub">&gt; Frontend &amp; Full-Stack Engineer</p>
        <p className="sub">&gt; React · Next.js · TypeScript</p>
        <p className="sub">&gt; AI / ML &amp; Generative AI Systems</p>
        <p className="cmd mt-2">
          <span className="prompt">$ </span>current_focus
        </p>
        <p className="sub">&gt; Crafting modern, responsive web apps</p>
        <p className="sub">&gt; Interactive 3D &amp; client interfaces</p>
        <p className="sub">&gt; Full-stack intelligent systems</p>
        <p className="cmd mt-2">
          <span className="prompt">$ </span>system_status
        </p>
        <div className="badges">
          <span className="badge badge-gold">[ ONLINE ]</span>
          <span className="badge badge-amber">[ READY TO BUILD ]</span>
          <span className="cursor-block">█</span>
        </div>
      </div>
      <div className="holo-fallback-modules">
        <div className="module-item">✧ 01 // AI &amp; Neural</div>
        <div className="module-item">✧ 02 // Full-Stack Dev</div>
        <div className="module-item">✧ 03 // Vector Database</div>
        <div className="module-item">✧ 04 // Cloud Pipeline</div>
      </div>
    </div>
  );
}

