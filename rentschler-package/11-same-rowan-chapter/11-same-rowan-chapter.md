# Search-and-Rescue UAV — SAME Rowan Grant Program

*Proposal Author & Power-Distribution Subframe Lead · SAME Philadelphia Post-Funded UAV Program · Sep 2025 – Present*

**Tags:** UAV Systems Design · Composite Airframe · Power-Distribution Subframe · Grant Proposal Authorship · Avionics Integration · FAA Part 107

**Highlight metrics:** $4,640 grant secured · 7 ft wingspan · 120-min target flight endurance · 3.5 kg payload capacity

---

## Overview & Objective

Authored the technical proposal that secured a $4,640 grant from the SAME Philadelphia Post to design and build a 7-ft-wingspan, woven-carbon-fiber fixed-wing search-and-rescue UAV — a 9.5 kg-MTOW airframe targeting a 120-minute endurance and a 3.5 kg medical-supply payload — and directed the aircraft's electrical and power-distribution subframe architecture. Rebuilding a dormant SAME student chapter's officer board and faculty ties was the organizational step that made pursuing this funded engineering program possible, not the engineering work itself.

## System Architecture & Technical Stack

- **Airframe:** woven carbon-fiber (2x2 twill) unibody fuselage, cast as a single piece to house avionics, power, and the motor while cutting weight and adding stiffness; two-piece wing using a NACA 2412 airfoil for high lift at low speed, suited to slow, long-endurance loiter and search patterns
- **Empennage:** a carbon-fiber rod boom in place of a standard bulky tail structure, carrying a V-tail with symmetrical-airfoil ruddervators that combine elevator and rudder into one control surface, reducing actuator count
- **Power-distribution subframe (directed scope):** 72x Molicel P42A 18650 cells in a 6S pack, a 6S 100A smart BMS, and 0.2 mm pure-nickel-strip busbars, with integrated heat sinks routed through the fuselage airflow path and real-time telemetry alerts above 55°C to manage thermal load across a 2-hour discharge cycle
- **Avionics & flight control:** Cube Orange+ (ArduPilot/PX4) primary flight computer with triple-redundant IMU, Nvidia Jetson Orin Nano secondary computer for edge AI/computer vision, triple-redundant GNSS with Pitot and LiDAR for navigation, and a DragonLink V3 (433 MHz) long-range link for 50–60 km line-of-sight command and telemetry
- **Structural proof-of-concept:** a hand-built balsa-and-foam flying-wing demonstrator — laser-cut balsa wing ribs, a foam-core boom, off-the-shelf motor/ESC — built to validate the aerodynamic layout and construction sequence before committing material cost to the full composite layup

**Suggested images (in `Society of Military Engineers/IMAGES/`):**
- `sar-drone-render-cover.png` — CAD render from the funded proposal: 7-ft wingspan, carbon-fiber unibody fuselage, V-tail ruddervator empennage on a carbon-rod boom
- `balsa-wing-rib-assembly.jpg` — laser-cut balsa wing rib assembly for the proof-of-concept glider, validating the airframe construction sequence proposed for the full-scale composite UAV
- `balsa-glider-assembled.jpg` — assembled balsa-and-foam demonstrator with motor and ESC installed, used to test the aerodynamic layout ahead of the composite build

## Engineering Challenges & Iteration

Writing the proposal meant reconciling the aircraft's technical requirements against a hard $4,640 ceiling before a single part was ordered. Every requirement in the specification — 3.5 kg static load at a 1.5 Factor of Safety, 120-minute endurance, a 400 ft AGL hard-coded geofence under FAA Part 107, 50–60 km line-of-sight command range — had to be traceable to a specific, line-itemed component in the bill of materials, not an aspirational target. That discipline shaped material selection directly: FDM, SLA, and laser-cut prototyping were specified ahead of the final composite layup precisely because they let the team validate a design change in hours rather than committing carbon-fiber material cost to a mistake.

Within that budget, the power-distribution subframe was directed personally: sizing a 72-cell, 6S Molicel P42A 18650 pack and matching 100A smart BMS against the propulsion system's current draw and the 120-minute endurance target, then addressing the thermal-runaway risk that a 2-hour continuous discharge introduces — integrated heat sinks in the fuselage airflow path and telemetry alerts above 55°C, with a rail-mounted internal payload rail specified separately so a mid-flight medical-supply drop doesn't shift the center of gravity off the aircraft's neutral point. The balsa proof-of-concept glider served the same de-risking function at the airframe level, confirming the aerodynamic layout and build sequence on a low-cost demonstrator before cutting into 2x2 twill carbon fiber and foam-core sandwich material for the production airframe.

## Quantitative Results & Validation

The proposal was approved in full, at the exact $4,640 requested, by the SAME Philadelphia Post — the clearest external check on the technical credibility of the specification, since a reviewing committee funded the program's line-itemed BOM and requirements as written rather than a reduced scope. The aircraft is currently moving through the proposal's 15-week milestone schedule: CAD modeling and FEA stress analysis (weeks 1–5), material procurement and tooling setup (weeks 5–7), prototype machining and assembly (weeks 7–10), destructive/non-destructive testing (weeks 10–12), and final finishing and installation (weeks 12–15), with the validation plan specifying Simulink/CAD stability simulation, airframe FEA to confirm the 1.5 FoS target, power-system thermal testing across the full flight envelope, and a full 2-hour, 3.5 kg-payload endurance flight test ahead.

| Requirement | Target / Status |
|---|---|
| Grant Funding | $4,640 requested and approved in full |
| Load | 3.5 kg static payload capacity, 1.5 Factor of Safety |
| Endurance | 120-minute mission duration at 20 m/s cruise |
| Altitude / Compliance | 400 ft AGL hard-coded geofence per FAA Part 107 |
| Program Phase | CAD/FEA and tooling underway, per the 15-week milestone schedule |

> "Good news! SAME Philadelphia Post has approved the drone project — fully funded per the proposal in the amount of $4640... Congratulations!"
> — Faculty advisor, confirming grant approval

The chapter also runs recurring K-12 STEM outreach events introducing students to the defense and aerospace engineering field, staffed alongside this build.

---
*Note for editing: the proposal's spec table came through PDF text extraction somewhat reflowed/scrambled, so every value above was cross-checked against the already-parsed spec table on the original site page, which matched consistently. Still worth a visual double-check against the source PDF if you want to re-verify independently.*
