number: "003"
category: "Product Design & Manufacturing"
title: "Subaru Technical Training Internship"
subtitle: "Product Design & Fabrication Intern · Subaru of America, Technical Training · Year-Long"
# repoHref: "https://github.com/you/bugbox-firmware"   # TODO: add once a repo URL exists

domainTags:
  - Xiao ESP32-S3
  - ESP-NOW Mesh
  - Web Dashboard UI
  - Parametric CAD Design
  - SolidWorks Flow Simulation
  - FDM 3D Printing
  - Time-of-Flight Sensing
  - DRV8322
  - ESP8266

summary: |
  Engineered a 14-node wireless embedded training network — the flagship deliverable of a year-long product design and fabrication internship — covering distributed sensor-node hardware, wireless control firmware, and a remote-control web dashboard. The network scaled a single-node bench prototype into a fourteen-unit deployed fleet, applying the same design-build-instrument-iterate cycle used in research hardware to a manufacturing training environment.

  Alongside the network, the internship's fabrication scope included a parametric small-parts organization system for the shop's electronics inventory, a CFD-validated ventilation and dual-mode retrofit for the shop's Xtool laser cutter plus a rolling material organizer, a set of fabricated hardware for a company-wide golf-themed event, and a Time-of-Flight sensing stack integrated onto an autonomous demo vehicle. Each piece follows the same rule: validate a single unit or a simulation before committing to a fleet, an event, or a chassis build.

specs:
  - label: "Bench Prototype MCU"
    value: "ESP8266"
  - label: "Production Node MCU"
    value: "Xiao ESP32-S3 (×14)"
  - label: "Node Power"
    value: "Dual 18650, 6000mAh, passive cooling"
  - label: "Switched-Load Control"
    value: "Logic-level MOSFET, GPIO-gated via 220Ω resistor"
  - label: "Wireless / Node UI"
    value: "ESP-NOW mesh, AP-host node; browser dashboard with per-node toggle"
  - label: "Shop Fabrication"
    value: "Parametric organizer, Xtool ventilation duct (SolidWorks Flow Sim), golf-event hardware"
  - label: "Vehicle Sensing/Actuation"
    value: "3x Time-of-Flight (front/left/right), DRV8322 driver, Arduino Uno, RC K-Truck chassis"

demoVideo:
  src: "SubaruInternship/videos/bugbox-demo.mp4"
  poster: "SubaruInternship/images/bugbox-nodes-labeled.jpg"
  caption: "The node-control dashboard toggling a live Bug Box on/off, and the autonomous vehicle running at the company-wide golf event."

gallery:
  - src: "SubaruInternship/images/bugbox-circuit-schematic.jpg"
    caption: "Bug Box circuit schematic — ESP32-S3, GPIO-gated MOSFET switching, and dual-18650 power/charge path"
    tall: true
  - src: "SubaruInternship/images/bugbox-node-cad-render.jpg"
    caption: "Production node enclosure, CAD render — charging port, debug port, and power switch consolidated on one face for field service without disassembly"
    tall: true
  - src: "SubaruInternship/images/bugbox-testbench.jpg"
    caption: "Bench prototype (Bug Box test bench) — switching and power architecture validated before committing to fourteen units"
  - src: "SubaruInternship/images/bugbox-node-assembly-bench.jpg"
    caption: "Production nodes mid-assembly — batteries, wiring, and enclosures built in parallel"
  - src: "SubaruInternship/images/bugbox-nodes-labeled.jpg"
    caption: "Completed 14-node fleet, individually labeled and wired to a shared power strip for bench testing prior to deployment"
  - src: "SubaruInternship/images/component-organizer-drawer.jpg"
    caption: "Parametric small-parts organization system — color-coded, labeled compartments generated from a single adjustable CAD model, holding the shop's full electronics inventory"
  - src: "SubaruInternship/images/xtool-ventilation-cfd.jpg"
    caption: "SolidWorks Flow Simulation of the Xtool laser-cutter ventilation duct, airflow trajectories colored by pressure"
    tall: true
  - src: "SubaruInternship/images/xtool-ventilation-cfd-animated.gif"
    caption: "Animated SolidWorks Flow Simulation of the same ventilation duct, showing airflow trajectories moving through the geometry over time"
    tall: true
  - src: "SubaruInternship/images/xtool-material-organizer-cart.jpg"
    caption: "Rolling vertical-slot material organizer built for the Xtool laser cutter, keeping sheet stock upright and within reach during cutting"
  - src: "SubaruInternship/images/golf-ramp-engine.jpg"
    caption: "Modular, magnet-interlocking golf ramp routed around a retired Subaru engine block for a company-wide golf-themed event"
  - src: "SubaruInternship/images/golf-caddy-print.jpg"
    caption: "Pole-mounted golf caddy — pencil and scorecard holders plus a ball hopper with a retrieval tab, multi-color printed on a Bambu Lab AMS"
  - src: "SubaruInternship/images/event-sign-photo.jpg"
    caption: "Pole-mounted event sign — clamshell laser-cut and 3D-printed frame around a removable, rewritable whiteboard insert"
  - src: "SubaruInternship/images/autonomous-car-truck-front.jpg"
    caption: "Autonomous demo vehicle — modified RC K-Truck chassis with a custom-printed Subaru cargo container, built for the same golf-themed event"
  - src: "SubaruInternship/images/tof-sensor-diagram.jpg"
    caption: "Time-of-Flight sensing principle used to size sensor placement and update rate on the autonomous vehicle chassis"
    tall: true
  - src: "SubaruInternship/images/subaruinternshipgroupinternphoto.jpg"
    caption: "The Subaru of America intern cohort, in front of the company's heritage timeline wall"

challenges: |
  #### Bug Box Fleet: Scaling One Bench Unit to Fourteen Field Nodes
  Moving from one validated bench prototype to fourteen identical, independently deployed nodes surfaced manufacturability and reliability constraints that don't show up at the single-unit stage. Each node is built from a 23-line bill of materials assembled in roughly twenty sequenced steps, documented in a step-by-step build guide so any teammate could reproduce a node without ambiguity. Serviceability was treated as a first-class constraint at fleet scale: four M3 heat-set inserts, pressed in with a soldering iron, let the top plate be removed and re-fastened in the field without stripping plastic threads, and the switching MOSFET's heat sink is both epoxied and mechanically fastened for thermal margin under repeated switching cycles rather than relying on epoxy alone. Strain relief (a rubber grommet on the switched leads) and heat-shrunk brass spade connectors on the battery leads address failure modes that are tolerable on a single bench unit but compound across fourteen field-deployed nodes. Every node is verified with a power-on smoke test — confirming the ESP32's status LED before final assembly — as an inline quality gate rather than a post-hoc check.

  #### Remote Node-Control Dashboard
  Fourteen field-deployed nodes are only as useful as the ability to see and control them without walking the floor. I built a lightweight, mobile-sized browser dashboard on top of the ESP-NOW mesh: each node renders as a status card (online/offline/pending) with uptime, a MOSFET power toggle, and fleet-wide "All On" / "All Off" / "Discover" actions, polling the mesh host every two seconds so the UI reflects real node state rather than a stale snapshot. A pending state animates while a toggle command is in flight, so an operator can tell a command was received versus dropped on a mesh with fourteen independent radios. [Open the live dashboard preview](SubaruInternship/bugbox-dashboard.html) (simulated node data, same interface as the deployed version).

  #### Parametric Component Organization System
  The shop's small-parts electronics inventory (resistors, sensors, microcontrollers, connectors) had no centralized home, which meant time lost hunting for parts mid-build. I modeled a single parametric CAD box — compartment count, width, and depth all driven by a few dimensions — and generated a full two-layer, color-coded organizer from it, with a sliding top layer for a second tier of access and a labeling section built into the print rather than added after the fact. Because the compartment geometry is parametric, resizing a bin for a new part category is a dimension change, not a redesign — the same approach used for the Bug Box enclosures, applied to shop infrastructure instead of a deployed product.

  #### Xtool Laser Cutter: Ventilation, Dual-Mode Cutting, and a Rolling Material Organizer
  The shop's Xtool laser cutter had two independent usability problems worth solving with the same rigor as the electronics work. First, its stock configuration required a hardware swap to switch between conveyor-belt and flat-bed cutting, which discouraged use of conveyor mode entirely, and its exhaust setup needed reconfiguration between jobs. Rather than fabricate a duct and see if it worked, the ventilation path was simulated in SolidWorks Flow Simulation first; the resulting compact duct design supports both cutting modes without additional per-job setup, and the laser itself was modified so switching between conveyor and regular cutting no longer requires an equipment change. Second, sheet stock (plywood, acrylic) had no dedicated storage near the machine, so I built a rolling vertical-slot material organizer that keeps stock upright, sorted, and within arm's reach of the cutting bed — a small fix that removed a repeated setup delay from every job.

  #### Golf-Themed Event Fabrication: Ramps, Caddy, and Signage
  A company-wide golf-themed event needed a full set of custom hardware on a fixed deadline, which meant designing for fast, reliable fabrication rather than a single best part. The golf ramps were 3D printed as interlocking modular sections — embedded magnets join sections together, weights hold them in place during putts, and a V-shaped routing lets a ball take more than one path — with several ramps built to route balls through retired Subaru engine and motor components as event-themed obstacles. The pole-mounted golf caddy combines a pencil holder, a scorecard slot, and a ball hopper with a protruding tab for retrieving low balls, printed in a single multi-color pass on a Bambu Lab AMS with the Subaru Technical Training logo built into the print. The matching pole-mounted event signs use a clamshell design — laser-cut and 3D-printed layers sandwich a removable, laser-cut whiteboard insert that can be wiped and rewritten for different events rather than replaced.

  #### Autonomous Vehicle Sensor Placement
  The same event's centerpiece demo was an autonomous vehicle built on a modified RC K-Truck chassis with a custom-printed Subaru cargo container. The Time-of-Flight sensor placement went through a validate-then-commit process: the sensing principle (timing a photon's round trip to a target) was worked out explicitly before deciding where to mount each of the three sensors and how fast to poll them, since front/left/right coverage and update rate directly determine how reliably the chassis derives distance and tire speed. An Arduino Uno reads the three ToF sensors and drives a DRV8322 motor driver for propulsion, integrated into the truck's cargo bed alongside the rest of the electronics.

results:
  narrative: |
    Fourteen independently addressable, dual-18650 (6000 mAh) nodes were built, wired, and deployed as a networked fleet, each verified with a power-on smoke test before final assembly and each field-serviceable through a four-point-fastened enclosure, controllable fleet-wide from a browser dashboard. The parametric component organizer consolidated the shop's electronics inventory into one labeled, two-tier system, and the Xtool ventilation and dual-mode retrofit was validated in SolidWorks Flow Simulation prior to fabrication and has required no additional per-job setup since installation. The full slate of golf-event hardware (ramps, caddy, signage) and the autonomous vehicle's three-sensor Time-of-Flight stack were fabricated, assembled, and demonstrated live at a company-wide event.
  metrics:
    - value: "14"
      label: "Networked Nodes Deployed"
    - value: "6000 mAh"
      label: "Battery per Node (2× 18650)"
    - value: "5"
      label: "Engineering Subsystems Delivered"
    - value: "1 Yr"
      label: "Internship Duration"

nav:
  prev:
    slug: "test-rig-instrumentation"
    title: "Test Rig, Instrumentation & Human Trials"
  next:
    slug: "berta-medical"
    title: "Berta Medical - Wearable ECG Platform"
