number: "004"
category: "Rowan Robotics Lab"
title: "Modular Flexible PCB for Soft Robotics"
subtitle: "Undergraduate Research Assistant · Rowan Robotics Lab (PI: Dr. Mitja Trkov) · 2025"

domainTags:
  - Flex PCB
  - KiCad 9
  - DRV8833
  - CD74HC4067
  - Seeeduino XIAO
  - I2C
  - FPC Connector
  - SMD Reflow

summary: |
  Engineered the flexible mainboard electronics for a self-reconfiguring soft robot module: a two-layer KiCad flex PCB, fit to a 96x28mm footprint, that drives pneumatic actuation, reads a resistive bend sensor, and carries power and I2C communication to neighboring modules across the platform. Designed under PI Dr. Mitja Trkov in the Rowan Robotics Lab, working alongside graduate researcher Joshua Knospler to integrate the boards into the physical multi-module system.

  This is a contribution to a larger research effort, not a solo project — the electronics contribution is cited in a forthcoming 2025 co-authored publication, with the underlying research now under evaluation for patenting.

specs:
  - label: "PCB"
    value: "2-layer flex, KiCad 9, 96×28mm"
  - label: "Actuator Drivers"
    value: "2x DRV8833PW dual H-bridge"
  - label: "I/O Expansion"
    value: "CD74HC4067M 16-ch analog mux"
  - label: "Sensing"
    value: "Resistive bend sensor, voltage-divider, 4.7kΩ pull-down"
  - label: "Inter-Module Comms"
    value: "PAC connector — I2C, power, actuator lines"
  - label: "MCU Interface (Rev B)"
    value: "11-pin FPC (FH35C-11S) → Seeeduino XIAO"
  - label: "Assembly"
    value: "Hand SMD reflow, microscope-inspected"

gallery:
  - src: "Soft Robotics Research/images/pcb-render-v2-front.png"
    caption: "Rev B mainboard, front — dual DRV8833 actuator drivers, CD74HC4067 mux, 11-pin FPC connector to the Seeeduino XIAO daughterboard"
    tall: true
  - src: "Soft Robotics Research/images/schematic-v2.png"
    caption: "Rev B schematic — PAC connector I2C/power bus, bend-sensor divider, FPC handoff to the secondary MCU board"
    tall: true
  - src: "Soft Robotics Research/images/mechanical-dimensions.png"
    caption: "Module PCB mechanical dimension drawing — 96x28mm outline with mounting holes and connector notch"
    tall: true
  - src: "Soft Robotics Research/images/fabricated-boards-photo.png"
    caption: "Freshly reflowed Rev B boards, hot-plate/heat-gun assembled, next to the build checklist"
  - src: "Soft Robotics Research/images/rev2-board-closeup-photo.png"
    caption: "Rev B mainboard close-up — SMD reflow joints on the flexible polyimide substrate, post-microscope inspection"
  - src: "Soft Robotics Research/images/pac-connectors-photo.png"
    caption: "PAC connector harness assembly — power, I2C, and actuator lines between adjacent modules"
  - src: "Soft Robotics Research/images/assembled-module-photo1.png"
    caption: "Rev B mainboard integrated into a printed module housing, motors and PAC harness connected"
  - src: "Soft Robotics Research/images/multi-module-assembly-photo.png"
    caption: "Multiple soft robotic modules with Rev B mainboards installed, assembled together on the bench"

challenges: |
  Rev A came back from fabrication with 2–3 incorrect traces, which had to be corrected with hand-soldered wire jumpers before the boards were usable — a direct, first-hand lesson in the cost of skipping a second design review before sending a flex board out. The microcontroller interface on Rev A was also implemented as multiple discrete pads directly on the mainboard, coupling the MCU footprint to the mainboard's own fabrication cycle.

  Rev B corrected the routing errors and iterated on both the actuator drive stage and the MCU interface: through-hole 2N2222 transistors driving the pneumatic solenoid valves were replaced with SMD AO3400A MOSFETs to cut footprint and simplify reflow, and the MCU pads were replaced with an 11-pin FPC connector to a separate Seeeduino XIAO board — a modularity change that means a bad microcontroller or firmware revision no longer requires re-fabricating the whole mainboard. Every board, Rev A and Rev B, was hand-assembled and reflow-soldered on a flexible polyimide substrate rather than rigid FR4, which demands tighter thermal control at the hot plate/heat gun stage to avoid delaminating the flex laminate, and each board was checked under a microscope for solder joint integrity and trace bridging before it went into a module.

  Working with graduate researcher Joshua Knospler on module integration, the mainboard's form factor was matched to the module's mechanical design, and I assisted in module assembly, including wiring the PAC connector harnesses that carry power, I2C, and actuator lines between adjacent modules.
challengesTitle: "Failure Modes, Root Causes, and Design Iteration"

results:
  narrative: |
    Initial electrical validation confirmed continuity and power integrity across the assembled Rev B boards, and modules successfully powered their actuators under load with stable performance, including a pneumatic inflation test of an assembled module. Full system-level validation and long-term flexion-cycle reliability testing were planned as the next research phase and had not been completed as of this writing.
  metrics:
    - value: "2"
      label: "Board Revisions (Rev A → Rev B)"
    - value: "96×28mm"
      label: "Module PCB Footprint"
    - value: "2025"
      label: "Co-Authored Publication"
  table:
    headers: ["Item", "Status"]
    rows:
      - ["Board revisions", "2 (Rev A -> Rev B)"]
      - ["Module PCB footprint", "96 x 28mm, two-layer flex"]
      - ["Continuity / power-integrity check", "Confirmed on assembled Rev B boards"]
      - ["Actuator drive under load", "Stable, including a module pneumatic inflation test"]
      - ["Long-term flexion-cycle testing", "Planned for next research phase, not yet completed"]
      - ["Publication status", "Cited in a forthcoming 2025 co-authored publication"]
      - ["IP status", "Underlying research under evaluation for patenting"]

nav:
  prev:
    slug: "digital-scale"
    title: "Custom Digital Scale"
  next:
    slug: "same-rowan-chapter"
    title: "Search-and-Rescue UAV — SAME Rowan Grant Program"
