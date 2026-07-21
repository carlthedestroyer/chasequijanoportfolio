number: "005"
category: "Grant-Funded UAV Program"
title: "Search-and-Rescue UAV — SAME Rowan Grant Program"
subtitle: "Proposal Author & Power-Distribution Subframe Lead · SAME Philadelphia Post-Funded UAV Program · Sep 2025 – Present"

domainTags:
  - UAV Systems Design
  - Composite Airframe
  - Power-Distribution Subframe
  - Grant Proposal Authorship
  - Avionics Integration
  - FAA Part 107

summary: |
  Authored the technical proposal that secured a $4,640 grant from the SAME Philadelphia Post to design and build a 7-ft-wingspan, woven-carbon-fiber fixed-wing search-and-rescue UAV — a 9.5 kg-MTOW airframe targeting a 120-minute endurance and a 3.5 kg medical-supply payload — and directed the aircraft's electrical and power-distribution subframe architecture.

  Rebuilding a dormant SAME student chapter's officer board and faculty ties was the organizational step that made pursuing this funded engineering program possible, not the engineering work itself.

specs:
  - label: "Airframe"
    value: "2×2 twill carbon-fiber unibody fuselage, NACA 2412 wing"
  - label: "Empennage"
    value: "Carbon-rod boom, V-tail ruddervators"
  - label: "Power Subframe"
    value: "72× Molicel P42A 18650, 6S, 100A smart BMS"
  - label: "Flight Computer"
    value: "Cube Orange+ (ArduPilot/PX4), triple-redundant IMU"
  - label: "Secondary Compute"
    value: "Nvidia Jetson Orin Nano (edge AI/CV)"
  - label: "Link"
    value: "DragonLink V3 (433 MHz), 50–60 km line-of-sight"
  - label: "Proof-of-Concept"
    value: "Balsa-and-foam flying-wing demonstrator"

gallery:
  - src: "Society of Military Engineers/IMAGES/sar-drone-render-cover.png"
    caption: "CAD render from the funded proposal — 7-ft wingspan, carbon-fiber unibody fuselage, V-tail ruddervator empennage on a carbon-rod boom"
    tall: true
  - src: "Society of Military Engineers/IMAGES/balsa-wing-rib-assembly.jpg"
    caption: "Laser-cut balsa wing rib assembly for the proof-of-concept glider, validating the airframe construction sequence proposed for the full-scale composite UAV"
  - src: "Society of Military Engineers/IMAGES/balsa-glider-assembled.jpg"
    caption: "Assembled balsa-and-foam demonstrator with motor and ESC installed, used to test the aerodynamic layout ahead of the composite build"
  - src: "Society of Military Engineers/IMAGES/officer-board-gear-table.jpg"
    caption: "Chapter officer board staffing a hands-on demo table — 3D-printed gears and a breadboard circuit demo — at a K-12 STEM Day outreach event"
  - src: "Society of Military Engineers/IMAGES/stem-day-outreach-tent.jpg"
    caption: "Chapter tabling at the Rowan Motorsports event, fundraising for the club"

challenges: |
  Writing the proposal meant reconciling the aircraft's technical requirements against a hard $4,640 ceiling before a single part was ordered. Every requirement in the specification — 3.5 kg static load at a 1.5 Factor of Safety, 120-minute endurance, a 400 ft AGL hard-coded geofence under FAA Part 107, 50–60 km line-of-sight command range — had to be traceable to a specific, line-itemed component in the bill of materials, not an aspirational target. That discipline shaped material selection directly: FDM, SLA, and laser-cut prototyping were specified ahead of the final composite layup precisely because they let the team validate a design change in hours rather than committing carbon-fiber material cost to a mistake.

  Within that budget, the power-distribution subframe was directed personally: sizing a 72-cell, 6S Molicel P42A 18650 pack and matching 100A smart BMS against the propulsion system's current draw and the 120-minute endurance target, then addressing the thermal-runaway risk that a 2-hour continuous discharge introduces — integrated heat sinks in the fuselage airflow path and telemetry alerts above 55C, with a rail-mounted internal payload rail specified separately so a mid-flight medical-supply drop doesn't shift the center of gravity off the aircraft's neutral point.

  The balsa proof-of-concept glider served the same de-risking function at the airframe level, confirming the aerodynamic layout and build sequence on a low-cost demonstrator before cutting into 2x2 twill carbon fiber and foam-core sandwich material for the production airframe.

results:
  narrative: |
    The proposal was approved in full, at the exact $4,640 requested, by the SAME Philadelphia Post — the clearest external check on the technical credibility of the specification, since a reviewing committee funded the program's line-itemed BOM and requirements as written rather than a reduced scope.

    > "Good news! SAME Philadelphia Post has approved the drone project — fully funded per the proposal in the amount of $4640... Congratulations!"
    >
    > — Faculty advisor, confirming grant approval

    The aircraft is currently moving through the proposal's 15-week milestone schedule: CAD modeling and FEA stress analysis (weeks 1–5), material procurement and tooling setup (weeks 5–7), prototype machining and assembly (weeks 7–10), destructive/non-destructive testing (weeks 10–12), and final finishing and installation (weeks 12–15), with the validation plan specifying Simulink/CAD stability simulation, airframe FEA to confirm the 1.5 FoS target, power-system thermal testing across the full flight envelope, and a full 2-hour, 3.5 kg-payload endurance flight test ahead.

    The chapter also runs recurring K-12 STEM outreach events introducing students to the defense and aerospace engineering field, staffed alongside this build.
  metrics:
    - value: "$4,640"
      label: "Grant Secured, Approved in Full"
    - value: "7 ft"
      label: "Wingspan"
    - value: "120 min"
      label: "Target Flight Endurance"
    - value: "3.5 kg"
      label: "Payload Capacity"
  table:
    headers: ["Requirement", "Target / Status"]
    rows:
      - ["Grant Funding", "$4,640 requested and approved in full"]
      - ["Load", "3.5 kg static payload capacity, 1.5 Factor of Safety"]
      - ["Endurance", "120-minute mission duration at 20 m/s cruise"]
      - ["Altitude / Compliance", "400 ft AGL hard-coded geofence per FAA Part 107"]
      - ["Program Phase", "CAD/FEA and tooling underway, per the 15-week milestone schedule"]

nav:
  prev:
    slug: "soft-robotics"
    title: "Modular Flexible PCB for Soft Robotics"
  next:
    slug: "ros-robot"
    title: "ROS Robot — Mobile Perception Platform"
