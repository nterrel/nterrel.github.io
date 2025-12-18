"use client";

import { useEffect, useMemo, useState } from "react";

const SECTIONS = [
  { id: "contact", label: "Contact" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "presentations", label: "Presentations" },
  { id: "volunteering", label: "Volunteering" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

export default function HomeTabs() {
  const defaultId: SectionId = "about";
  const [active, setActive] = useState<SectionId>(defaultId);

  // Optional: allow deep-linking via URL hash (#projects)
  useEffect(() => {
    const hash = window.location.hash?.slice(1) as SectionId | "";
    if (hash && SECTIONS.some(s => s.id === hash)) setActive(hash);
  }, []);

  const activeLabel = useMemo(
    () => SECTIONS.find(s => s.id === active)?.label ?? "Section",
    [active]
  );

  return (
    <>
      <nav className="tabs" role="tablist" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className="tab"
            role="tab"
            aria-selected={active === s.id}
            onClick={() => {
              setActive(s.id);
              history.replaceState(null, "", `#${s.id}`);
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <section className="card" aria-label={activeLabel}>
        {active === "contact" && (
          <>
            <h2>Contact</h2>
            <p>
              <a href="mailto:nickterrel4@gmail.com">nickterrel4@gmail.com</a> •{" "}
              <a href="https://github.com/nterrel" target="_blank" rel="noopener noreferrer">GitHub</a> •{" "}
              <a href="https://linkedin.com/in/nick-terrel-a55b34194" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </>
        )}

        {active === "about" && (
          <>
            <h2>About</h2>
            <p>
              I am a computational scientist with a focus on developing tools to accelerate molecular dynamics. 
              I&apos;m going to write more, but it&apos;s after 5 pm and tonight is taco night...
            </p>
          </>
        )}

        {active === "projects" && (
          <>
            <h2>Projects</h2>
            <div className="grid">
              <a className="project" href="https://github.com/nterrel/llmini" target="_blank" rel="noopener noreferrer">
                <h3>LLMini</h3>
                <p>
                  Mini GPT-style model for learning transformer internals + a path toward chemistry token models (SMILES/SELFIES)
                </p>
              </a>
              <a className="project" href="https://github.com/nterrel/ani-mm" target="_blank" rel="noopener noreferrer">
                <h3>ani-mm</h3>
                <p>
                  Implementation of TorchANI MLIPs into OpenMM for running molecular dynamics with a live-viewer of the simulation.
                </p>
              </a>
            </div>
          </>
        )}

        {active === "research" && (
          <>
            <h2>Research</h2>
            <ul>
              <li><b>TorchANI:</b> Atomic behavior in MLIPs, uncertainty quantification, extending functionality and integration into popular MD suites (LAMMPS, OpenMM).</li>
              <li><b>cuMolFind:</b> GPU-accelerated molecular dynamics analysis toolkit.</li>
              <li><b>LUKE: Use the Forces:</b> Uncertainty-based toolkit for sampling molecular substructures.</li>
            </ul>
          </>
        )}

        {active === "publications" && (
          <>
            <h2>Publications</h2>
            <ol className="pubs">
              <li>
                Nicholas S. Terrel, Jinze Xue, Ignacio J. Pickering, Melisa Alkan, Adrian E. Roitberg.
                <span className="title"> Exploring Prebiotic Chemistry with ANI Neural Network Potential.</span>
                <span className="status"> Manuscript in progress.</span>
              </li>
              <li>
                Jinze Xue, Nicholas S. Terrel, Ignacio J. Pickering, Adrian E. Roitberg.
                <span className="title"> LAMMPS-ANI: Large Scale Molecular Dynamics Simulations with ANI Neural Network Potential.</span>
                <span className="status"> To be submitted December 2025.</span>
              </li>
              <li>
                Ignacio J. Pickering, Jinze Xue, Kate Huddleston, Nicholas S. Terrel, Adrian E. Roitberg.
                <span className="title"> TorchANI 2.0: An Extensible, High-Performance Library for Neural Network Potential Design.</span>
                <span className="venue"> J. Chem. Inf. Model.</span> <span className="year">2025</span>.
                <span className="doi"> DOI: <a href="https://doi.org/10.1021/acs.jcim.5c01853" target="_blank" rel="noopener noreferrer">10.1021/acs.jcim.5c01853</a></span>
              </li>
              <li>
                Mikayla Y. Darrows, Dimuthu Kodituwakku, Jinze Xue, Ignacio J. Pickering, Nicholas S. Terrel, Adrian E. Roitberg.
                <span className="title"> LEGOLAS: a Machine Learning Method for Rapid and Accurate Predictions of Protein NMR Chemical Shifts.</span>
                <span className="venue"> J. Chem. Theory Comput.</span> <span className="year">2025</span>, <span className="vol">21</span> (<span className="issue">8</span>) <span className="pages">4266–4275</span>.
                <span className="doi"> DOI: <a href="https://doi.org/10.1021/acs.jctc.5c00026" target="_blank" rel="noopener noreferrer">10.1021/acs.jctc.5c00026</a></span>
              </li>
            </ol>
          </>
        )}

        {active === "presentations" && (
          <>
            <h2>Conference Presentations</h2>
            <ul className="talks">
              <li>
                <span className="talk-title"><b>LAMMPS-ANI Hero Run: Simulating Early Earth Chemistry at an Unprecedented Scale</b></span><br />
                <span className="event"><i>University of Florida 64th Sanibel Symposium</i></span> — <span className="track">Machine Learning Track</span><br />
                <span className="date">02/2025</span>
              </li>
              <li>
                <span className="talk-title"><b>Modeling of Early Earth Chemistry: 22.8 Million Atoms Simulated with TorchANI</b></span><br />
                <span className="event"><i>University of Florida AI Days Symposium</i></span> — <span className="track">Machine Learning in the Natural Sciences</span><br />
                <span className="date">10/2024</span>
              </li>
              <li>
                <span className="talk-title"><b>Atomistic Uncertainty Driven Data Generation in ANI Neural Network Potentials</b></span><br />
                <span className="event"><i>23rd Annual SciPy Conference</i></span> — <span className="track">Materials and Chemistry Track</span><br />
                <span className="date">07/2024</span>
              </li>
              <li>
                <span className="talk-title"><b>Uncertainty-Driven Data Generation in ANI Neural Network Potentials: An Atomistic Force-Based Approach</b></span><br />
                <span className="event"><i>American Chemical Society: Many Flavors of Chemistry</i></span> — <span className="track">Division of Computers in Chemistry</span><br />
                <span className="date">03/2024</span>
              </li>
              <li>
                <span className="talk-title"><b>Atomistic Uncertainty Estimation in ANAKIN-ME Neural Network Potentials</b></span><br />
                <span className="event"><i>American Chemical Society: Harnessing the Power of Data</i></span> — <span className="track">Division of Computers in Chemistry</span><br />
                <span className="date">08/2023</span>
              </li>
              <li>
                <span className="talk-title"><b>Atomistic Uncertainty Estimation in ANAKIN-ME Neural Network Potentials</b></span><br />
                <span className="event"><i>American Chemical Society Florida Section (FAME)</i></span><br />
                <span className="date">06/2023</span>
              </li>
            </ul>
          </>
        )}

        {active === "volunteering" && (
          <>
            <h2>Volunteering</h2>
            <ul className="volunteering">
              <li>
                <span className="role"><b>Open-source contributor (for funsies)</b></span><br />
                <span className="desc">
                  Contribute code, reviews, and user support for scientific Python tooling and ML-for-chemistry projects
                  (bug fixes, performance improvements, documentation, and reproducible examples).
                </span>
              </li>
              <li>
                <span className="role"><b>Recruitment Ambassador</b></span><br />
                <span className="desc">
                  Volunteered as a recruitment ambassador for the University of Florida, Department of Chemistry to help prospective graduate students learn about research opportunities and see the benefits of joining the UF Chemistry community.
                </span>
              </li>
              <li>
                <span className="role"><b>Mentorship &amp; peer support</b></span><br />
                <span className="desc">
                  Mentor students and early-career researchers on Python workflows for computational chemistry and HPC, including debugging, environment setup, and best practices for reproducible research.
                </span>
              </li>
              <li>
                <span className="role"><b>Community demos &amp; knowledge sharing</b></span><br />
                <span className="desc">
                  Create tutorials and mini-talks on practical scientific computing topics (GPU workflows, profiling, and scaling), aimed at making advanced tooling approachable to new users.
                </span>
              </li>
            </ul>
          </>
        )}
      </section>
    </>
  );
}