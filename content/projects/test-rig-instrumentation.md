number: "002B"
category: "Engineering Clinic Research"
title: "Test Rig, Instrumentation & Human Trials Program"
subtitle: "Fall-Prevention Exoskeleton Program (sub-project) · Rowan University · Jan 2024 – Present · PI: Dr. Mitja Trkov"

domainTags:
  - Pneumatic Actuation
  - Bowden Cable
  - String Potentiometer
  - Load Cell
  - Relay Board
  - Control Board

summary: |
  Fixed, crimped Bowden-cable fittings on the pneumatic cylinders made modifications and component swaps time-consuming in earlier iterations. I addressed this with a modular cable-retention mechanism developed by reverse-engineering a bicycle brake-lever assembly: a keyed steel piece on a swiveling axis locks the cable end-bead in place, allowing tool-free cable removal. In parallel, I own the test bench that characterizes the exoskeleton's force output, the structured load-cell test campaign that validates it, and the current push — alongside PhD student Vaibhavsingh Varma — toward human-subjects trials.

specs:
  - label: "Cylinder Assembly"
    value: "Modular, tool-free Bowden-cable retention (bicycle brake-lever mechanism, reverse-engineered)"
  - label: "Cylinder Assembly (Gen 1)"
    value: "1/4\" waterjet-cut steel + ABS"
  - label: "Cylinder Assembly (Gen 2)"
    value: "Waterjet-cut aluminum, adds string-potentiometer mount for closed-loop position feedback"
  - label: "Test Bench V2"
    value: "Laser-cut wood chassis, E-stop, switched 15V/5V rails, centralized pneumatic line, integrated pressure transducer"
  - label: "Hip Abduction Test Matrix"
    value: "96 trials — 4 actuation delays (40/50/60/80ms) x 6 supply pressures (50–100 PSI)"
  - label: "Backpack Electronics"
    value: "Relay Board V1 (12-channel), Control Board V2 — ~1/3 the size of the prior generation"
  - label: "Human Trials Target"
    value: "This fall semester, goal of 20 subjects (projected)"

gallery:
  - src: "Exoskeleton Research/overleafportfoliopdf/images/testbench_v1.jpg"
    caption: "Original plywood test bench: 3D-printed component mounts, series LiPo power, and the first pneumatic cylinder and solenoid layout."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/testbench_actual.jpg"
    caption: "Test Bench V2 laid out and prepared for hip-abduction load-cell data acquisition: E-stop, switched power rails, centralized pneumatic line, and integrated pressure transduction."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/torque_plot.jpg"
    caption: "Hip abduction load-cell results: supply pressure (PSI) against applied torque (N·m) across the 96-trial matrix."
    tall: true
  - src: "Exoskeleton Research/overleafportfoliopdf/images/force_stand.jpg"
    caption: "Hip mechanism on the force-testing stand with the load cell inline, the fixture behind the trial campaigns."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/cylinder_assembly.jpg"
    caption: "First-generation modular pneumatic cylinder assembly: tool-free Bowden-cable retention adapted from a bicycle brake-lever mechanism."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v2_cyl_side.jpg"
    caption: "Cylinder mechanism V2: string potentiometer on its custom mount with the wire routed to the rod end for closed-loop position feedback."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/v2_cyl_mount.jpg"
    caption: "V2 assembly with waterjet-cut aluminum mounting plates, replacing the previous steel for weight reduction."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/biomech_1.jpg"
    caption: "Worn biomechanics testing on the overhead safety tether: front, back, and side walking views, and a simulated-fall trial."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/biomech_2.jpg"
    caption: "Worn biomechanics testing on the overhead safety tether: front, back, and side walking views, and a simulated-fall trial."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/biomech_3.jpg"
    caption: "Worn biomechanics testing on the overhead safety tether: front, back, and side walking views, and a simulated-fall trial."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/biomech_4.jpg"
    caption: "Worn biomechanics testing on the overhead safety tether: front, back, and side walking views, and a simulated-fall trial."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/backpack_cad.jpg"
    caption: "CAD model progress on the exoskeleton backpack design: solenoids, custom relay and control boards, battery, and laser-cut paneling in one enclosure."
    tall: true
  - src: "Exoskeleton Research/overleafportfoliopdf/images/relay_v1_render.jpg"
    caption: "Relay Board V1 render: 12-channel, flyback-protected relay board of my design for the backpack control system, with switched 15V/5V distribution and a dedicated control-board header."
  - src: "Exoskeleton Research/overleafportfoliopdf/images/control_v2_render.jpg"
    caption: "Control Board V2 render: primary and secondary microcontrollers, with temperature monitoring across multiple systems plus pressure and voltage monitoring serving as a safety function, and LED status indication."

challenges: |
  #### Test Bench V2

  The original plywood test bench proved the concept but had an impractical footprint, and its 3D-printed cylinder mounts lacked the rigidity required for reliable actuation under pneumatic load. The revised bench is built on a laser-cut wood chassis that significantly reduces the footprint while improving structural rigidity, and adds the functional features testing actually needed: an emergency-stop button for immediate system shutoff, dedicated toggle switches for the 15V and 5V power rails for manual line-level control during debugging, a single centralized pneumatic line feeding all solenoids for simplified routing and fast pressurization between test cycles, and an integrated pressure transducer for real-time pressure readings with improved cable management.

  #### Hip Abduction Load-Cell Testing

  Characterizing the exoskeleton's force output was a primary objective. The chassis was fixed to a threaded steel table with a horizontal load-cell fixture mounted parallel to the exoskeleton leg, connected by a rope under tension with the static tension accounted for in all readings. A linear calibration model was derived from the manufacturer's documentation and verified through static trials. A standardized procedure governed every run: regulator setpoint, actuation delay configured in the control-board DAQ firmware, and a MATLAB DAQ script with output files named by trial number, pressure, and delay for traceability.

  A total of 96 trials were completed across a matrix of four actuation delays (40, 50, 60, 80ms) and six supply pressures (50–100 PSI). The collected data has been validated as viable, with trend analysis across the parameter space ongoing.

  #### Modular Pneumatic Cylinder Assembly

  Fixed, crimped Bowden-cable fittings on the pneumatic cylinders made modifications and component swaps time-consuming in earlier iterations. I addressed this with a modular cable-retention mechanism developed by reverse-engineering a bicycle brake-lever assembly: a keyed steel piece on a swiveling axis locks the cable end-bead in place, allowing tool-free cable removal. The first-generation assembly was constructed from 1/4" waterjet-cut steel and ABS to maintain structural integrity under cyclic loading.

  The second-generation mechanism adds a custom mount for a string potentiometer, enabling closed-loop position control in a compact form factor, and replaces the waterjet-cut steel plates with waterjet-cut aluminum for weight reduction ahead of its integration into the wearable backpack.

  #### Toward Human Trials & the All-in-One Backpack

  Biomechanics testing is now underway, work I carry out alongside PhD student Vaibhavsingh Varma: worn trials with the full system (harness, exoskeleton, and IMU sensing network together) conducted on an overhead safety tether.

  In parallel, I am developing an all-in-one backpack that encompasses the complete control system in a single wearable unit: completely new custom electronics designed to be as compact as possible — a custom Relay Board V1 of my design and a Control Board V2, nearly one-third the size of the previous generation — the latest edition of the cylinder mechanism using string-driven potentiometers for closed-loop control, laser-cut paneling, battery power with battery management and monitoring, and pneumatics pressurized via replaceable CO2 canisters for instantaneous release during human trials. Human trials are projected for this fall semester, with a goal of 20 subjects for testing.

  PhD student Vaibhavsingh Varma and I are preparing for the human trials and collecting the feedback that will shape the final procedure. I have been present for all testing throughout my time on the project, will help run the human trials this fall in the Rowan University biomechanics lab, and will be a co-author on an upcoming publication from this work.

  **Published work from this research program.** The exoskeleton program builds on the following publications by our group:
  1. V. Varma, S. N. Patel, N. P. Wilson, and M. Trkov, "Characterization of Hip Abduction Exoskeleton for Assistance During Gait Perturbations," *IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM)*, 2024. doi:10.1109/AIM55361.2024.10637061.
  2. V. Varma and M. Trkov, "Intersegmental coordination in human slip perturbation responses," *Journal of Biomechanics*, vol. 168, art. 112097, 2024. doi:10.1016/j.jbiomech.2024.112097.
  3. V. Varma and M. Trkov, "Investigation of intersegmental coordination patterns in human walking," *Gait & Posture*, vol. 112, pp. 88–94, 2024. doi:10.1016/j.gaitpost.2024.05.010.
  4. V. Varma, Z. Roberts, F. Mallick, and M. Trkov, "Estimating Human-Exoskeleton Interaction Forces Using an Instrumented Thigh Brace and OpenSim," *IFAC-PapersOnLine*, vol. 59, no. 30, pp. 353–358, 2025 (5th Conference on Modeling, Estimation and Control, MECC 2025). doi:10.1016/j.ifacol.2025.12.262.

results:
  narrative: |
    A total of 96 hip-abduction trials were completed across a matrix of four actuation delays (40, 50, 60, 80ms) and six supply pressures (50–100 PSI), fixture-validated with a linear load-cell calibration model, with the data validated as viable and trend analysis ongoing. The modular pneumatic cylinder assembly is now on its second generation, moving from waterjet-cut steel to aluminum and adding string-potentiometer closed-loop position feedback ahead of backpack integration.

    A new all-in-one backpack control system — Relay Board V1, Control Board V2 (roughly one-third the size of its predecessor), the latest cylinder mechanism, and CO2-canister pneumatics — is in development alongside worn biomechanics testing on an overhead safety tether, with human trials projected this fall semester at a target of 20 subjects.
  metrics:
    - value: "96"
      label: "Hip Abduction Trials (4 delays x 6 pressures)"
    - value: "2"
      label: "Cylinder Assembly Generations"
    - value: "~1/3"
      label: "Control Board V2 Size vs. Prior Gen"
    - value: "20"
      label: "Target Human-Trial Subjects (projected)"
  table:
    headers: ["Item", "Status"]
    rows:
      - ["Test bench", "V2 rebuilt — laser-cut chassis, E-stop, switched rails, centralized pneumatic line"]
      - ["Hip abduction load-cell trials", "96 trials completed (4 delays x 6 pressures) — validated as viable"]
      - ["Cylinder mechanism", "2nd generation — waterjet aluminum, string-pot closed-loop feedback"]
      - ["Relay Board V1 / Control Board V2", "New backpack electronics, designed for a compact all-in-one enclosure"]
      - ["Backpack integration", "CAD in progress — CO2-canister pneumatics, battery powered"]
      - ["Human trials", "Projected this fall semester, target of 20 subjects"]

nav:
  prev:
    slug: "imu-sensing-system"
    title: "IMU Sensing System"
  next:
    slug: "exoskeleton"
    title: "Fall-Prevention Exoskeleton"
