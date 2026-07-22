number: "006"
category: "Product Design & Manufacturing"
title: "Subaru Technical Training Internship"
subtitle: "Product Design & Fabrication Intern · Subaru of America, Technical Training · Year-Long"

domainTags:
  - Xiao ESP32-S3
  - ESP8266
  - Arduino Uno
  - ESP-NOW Mesh
  - Time-of-Flight Sensing
  - DRV8322
  - SolidWorks Flow Simulation
  - FDM 3D Printing

summary: |
  Engineered a 14-node wireless embedded training network and an autonomous demo vehicle inside a year-long industrial internship, covering distributed sensor-node hardware, wireless control firmware, and instrumented test infrastructure. The work scaled a single-node bench prototype into a fourteen-unit deployed fleet and integrated a Time-of-Flight sensing stack onto an autonomous vehicle chassis, applying the same design-build-instrument-iterate cycle used in research hardware to a manufacturing training environment.

  The network and the demo vehicle share a common approach: validate the electronics on a single bench unit before committing to a fleet or a chassis build.

specs:
  - label: "Bench Prototype MCU"
    value: "ESP8266"
  - label: "Production Node MCU"
    value: "Xiao ESP32-S3 (×14)"
  - label: "Node Power"
    value: "Dual 18650, 6000mAh, passive cooling"
  - label: "Switched-Load Control"
    value: "Logic-level MOSFET, GPIO-gated via 220Ω resistor"
  - label: "Wireless"
    value: "ESP-NOW mesh, AP-host node"
  - label: "Vehicle Sensing"
    value: "3x Time-of-Flight (front/left/right), Arduino Uno"
  - label: "Vehicle Actuation"
    value: "DRV8322 motor driver, RC K-Truck chassis"
  - label: "CAD/Fab"
    value: "SolidWorks, Fusion 360, FDM 3D printing"

gallery:
  - src: "SubaruInternship/images/bugbox-node-cad-render.jpg"
    caption: "Production node enclosure, CAD render — charging port, debug port, and power switch consolidated on one face for field service without disassembly"
    tall: true
  - src: "SubaruInternship/images/tof-sensor-diagram.jpg"
    caption: "Time-of-Flight sensing principle used to size sensor placement and update rate on the autonomous vehicle chassis"
    tall: true
  - src: "SubaruInternship/images/bugbox-testbench.jpg"
    caption: "Bench prototype (Bug Box test bench) — switching and power architecture validated before committing to fourteen units"
  - src: "SubaruInternship/images/bugbox-node-assembly-bench.jpg"
    caption: "Production nodes mid-assembly — batteries, wiring, and enclosures built in parallel"
  - src: "SubaruInternship/images/xtool-ventilation-cfd.jpg"
    caption: "SolidWorks Flow Simulation of the Xtool laser-cutter ventilation duct, airflow trajectories colored by pressure"
    tall: true
  - src: "SubaruInternship/images/bugbox-nodes-labeled.jpg"
    caption: "Completed 14-node fleet, individually labeled and wired to a shared power strip for bench testing prior to deployment"
  - src: "SubaruInternship/images/autonomous-car-truck-electronics.jpg"
    caption: "Arduino Uno, DRV8322 driver, and ToF sensor wiring integrated into the vehicle's electronics stack"

challenges: |
  #### Scaling One Bench Unit to Fourteen Field Nodes
  Moving from one validated bench prototype to fourteen identical, independently deployed nodes surfaced manufacturability and reliability constraints that don't show up at the single-unit stage. Each node is built from a 23-line bill of materials assembled in roughly twenty sequenced steps, documented in a step-by-step build guide so any teammate could reproduce a node without ambiguity. Serviceability was treated as a first-class constraint at fleet scale: four M3 heat-set inserts, pressed in with a soldering iron, let the top plate be removed and re-fastened in the field without stripping plastic threads, and the switching MOSFET's heat sink is both epoxied and mechanically fastened for thermal margin under repeated switching cycles rather than relying on epoxy alone. Strain relief (a rubber grommet on the switched leads) and heat-shrunk brass spade connectors on the battery leads address failure modes that are tolerable on a single bench unit but compound across fourteen field-deployed nodes. Every node is verified with a power-on smoke test — confirming the ESP32's status LED before final assembly — as an inline quality gate rather than a post-hoc check.

  #### Sensor Placement and Shop Ventilation
  The Time-of-Flight sensor placement on the autonomous vehicle went through a similar validate-then-commit process: the sensing principle (timing a photon's round trip to a target) was worked out explicitly before deciding where to mount each of the three sensors and how fast to poll them, since front/left/right coverage and update rate directly determine how reliably the chassis derives distance and tire speed. Separately, the shop's Xtool laser cutter had a ventilation problem worth solving with the same rigor: its stock configuration required a hardware swap to switch between conveyor-belt and flat-bed cutting, which discouraged use of conveyor mode entirely, and its exhaust setup needed reconfiguration between jobs. Rather than fabricate a duct and see if it worked, the ventilation path was simulated in SolidWorks Flow Simulation first, and the resulting compact duct design supports both cutting modes and requires no additional per-job setup.

results:
  narrative: |
    Fourteen independently addressable, dual-18650 (6000 mAh) nodes were built, wired, and deployed as a networked fleet, each verified with a power-on smoke test before final assembly and each field-serviceable through a four-point-fastened enclosure. The autonomous vehicle's three-sensor Time-of-Flight stack and DRV8322-driven propulsion were integrated onto the RC K-Truck chassis and demonstrated live at a company-wide event, and the laser-cutter ventilation redesign was validated in SolidWorks Flow Simulation prior to fabrication and has required no additional per-job setup since installation.
  metrics:
    - value: "14"
      label: "Networked Nodes Deployed"
    - value: "6000 mAh"
      label: "Battery per Node (2× 18650)"
    - value: "3"
      label: "ToF Sensors on Autonomous Vehicle"
    - value: "1 Yr"
      label: "Internship Duration"

nav:
  prev:
    slug: "foc-control-rig"
    title: "Field Oriented Control Test Bench"
  next:
    slug: "berta-medical"
    title: "Berta Medical - Wearable ECG Platform"
