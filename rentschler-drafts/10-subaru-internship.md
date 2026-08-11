# Subaru Technical Training Internship

*Product Design & Fabrication Intern · Subaru of America, Technical Training · Year-Long*

**Tags:** Xiao ESP32-S3 · ESP8266 · Arduino Uno · ESP-NOW Mesh · Time-of-Flight Sensing · DRV8322 Motor Driver · SolidWorks Flow Simulation · FDM 3D Printing · Embedded Systems

**Highlight metrics:** 14 wireless network nodes deployed · 6000 mAh battery per node (2× 18650) · 3 ToF sensors on autonomous vehicle · 1-year internship duration

---

## Overview & Objective

Engineered a 14-node wireless embedded training network and an autonomous demo vehicle inside a year-long industrial internship, covering distributed sensor-node hardware, wireless control firmware, and instrumented test infrastructure. The work scaled a single-node bench prototype into a fourteen-unit deployed fleet and integrated a Time-of-Flight sensing stack onto an autonomous vehicle chassis, applying the same design-build-instrument-iterate cycle used in research hardware to a manufacturing training environment.

## System Architecture & Technical Stack

The network and the demo vehicle share a common approach: validate the electronics on a single bench unit before committing to a fleet or a chassis build.

- **Bench prototype (Bug Box test bench)**: ESP8266 microcontroller driving a switching MOSFET to interrupt vehicle circuits on command, with current and temperature sensing for closed-loop safety monitoring and a TP4056 LiPo charge stage on an 18650 pack
- **Production node (×14)**: Xiao ESP32-S3 microcontroller per node, replacing the ESP8266 bench design; dual 18650 cells (6000 mAh) with passive cooling; a logic-level MOSFET (**L3705N**, likely an IRL3705N, but stated as documented in source material) gate-driven through a 220Ω resistor off a GPIO pin for switched-load control
- **Wireless control layer**: each node hosts its own lightweight web server; the deployed firmware runs an ESP-NOW mesh with one node acting as an access-point host, letting instructors arm and fire any node in range directly from a phone or laptop
- **Autonomous vehicle sensing/control stack**: Arduino Uno microcontroller reading three Time-of-Flight sensors (front, left, right) for obstacle distance and derived tire rotation/speed, paired with a DRV8322 motor driver for propulsion, on a modified RC K-Truck chassis
- **CAD/fabrication**: SolidWorks/Fusion 360 CAD for node enclosures and the vehicle's cargo container; FDM 3D printing for enclosures, mounting blocks, and fixtures; laser cutting used elsewhere in the shop's fixture and enclosure work

**Suggested images (in `SubaruInternship/images/`):**
- `bugbox-node-cad-render.jpg`: production node enclosure, CAD render, charging port, debug port, and power switch consolidated on one face for field service without disassembly
- `tof-sensor-diagram.jpg`: Time-of-Flight sensing principle used to size sensor placement and update rate on the autonomous vehicle chassis

## Engineering Challenges & Iteration

Moving from one validated bench prototype to fourteen identical, independently deployed nodes surfaced manufacturability and reliability constraints that don't show up at the single-unit stage. Each node is built from a 23-line bill of materials assembled in roughly twenty sequenced steps, documented in a step-by-step build guide so any teammate could reproduce a node without ambiguity: a requirement that doesn't exist for a one-off bench build but becomes necessary the moment identical units need to be produced in parallel by more than one person. Serviceability was treated as a first-class constraint at fleet scale: four M3 heat-set inserts, pressed in with a soldering iron, let the top plate be removed and re-fastened in the field without stripping plastic threads, and the switching MOSFET's heat sink is both epoxied and mechanically fastened for thermal margin under repeated switching cycles rather than relying on epoxy alone. Strain relief (a rubber grommet on the switched leads) and heat-shrunk brass spade connectors on the battery leads address failure modes that are tolerable on a single bench unit but compound across fourteen field-deployed nodes. Every node is verified with a power-on smoke test: confirming the ESP32's status LED before final assembly, as an inline quality gate rather than a post-hoc check.

The Time-of-Flight sensor placement on the autonomous vehicle went through a similar validate-then-commit process: the sensing principle (timing a photon's round trip to a target) was worked out explicitly before deciding where to mount each of the three sensors and how fast to poll them, since front/left/right coverage and update rate directly determine how reliably the chassis derives distance and tire speed. Separately, the shop's Xtool laser cutter had a ventilation problem worth solving with the same rigor: its stock configuration required a hardware swap to switch between conveyor-belt and flat-bed cutting, which discouraged use of conveyor mode entirely, and its exhaust setup needed reconfiguration between jobs. Rather than fabricate a duct and see if it worked, the ventilation path was simulated in SolidWorks Flow Simulation first, and the resulting compact duct design supports both cutting modes and requires no additional per-job setup.

**Suggested images:**
- `bugbox-testbench.jpg`: bench prototype, switching and power architecture validated before committing to fourteen units
- `bugbox-node-assembly-bench.jpg`: production nodes mid-assembly, batteries, wiring, and enclosures built in parallel
- `xtool-ventilation-cfd.jpg`: SolidWorks Flow Simulation of the Xtool laser-cutter ventilation duct, airflow trajectories colored by pressure

## Quantitative Results & Validation

Fourteen independently addressable, dual-18650 (6000 mAh) nodes were built, wired, and deployed as a networked fleet, each verified with a power-on smoke test before final assembly and each field-serviceable through a four-point-fastened enclosure. The autonomous vehicle's three-sensor Time-of-Flight stack and DRV8322-driven propulsion were integrated onto the RC K-Truck chassis and demonstrated live at a company-wide event, and the laser-cutter ventilation redesign was validated in SolidWorks Flow Simulation prior to fabrication and has required no additional per-job setup since installation.

**Suggested images:**
- `bugbox-nodes-labeled.jpg`: completed 14-node fleet, individually labeled and wired to a shared power strip for bench testing prior to deployment
- `autonomous-car-truck-electronics.jpg`: Arduino Uno, DRV8322 driver, and ToF sensor wiring integrated into the vehicle's electronics stack

---
*Note for editing: the MOSFET part number "L3705N" is verbatim from the source Bug Box Assembly Guide docx (no manufacturer prefix given); very likely an IRL3705N, but left as documented rather than guessed. Confirm the exact part before this goes out if precision matters here. Golf-cart/event-sign/UFO-print shop projects were deliberately left out to keep this document focused on the two strongest mechatronics stories (wireless node network + autonomous vehicle); say the word if you want those folded back in.*
