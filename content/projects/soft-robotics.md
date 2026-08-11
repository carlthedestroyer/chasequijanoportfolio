number: "001"
category: "Rowan Robotics Lab"
title: "Self-Reconfigurable Soft Robotic Modules"
subtitle: "Undergraduate Student Researcher · Rowan University (PI: Dr. Mitja Trkov) · May 2024 – Present"
# repoHref: "https://github.com/you/soft-robotics-mainboard"   # TODO: add once a repo URL exists

domainTags:
  - Flex PCB
  - KiCad
  - DRV8833
  - I2C Multiplexing
  - FPC Connector
  - SMD Reflow
  - Solenoid Drivers
  - Module Docking

summary: |
  Self-reconfigurable soft robotic modules require compact, reliable, and modular electronics to drive actuators, interface with sensors, and communicate between units. The challenge is designing PCBs that integrate seamlessly with soft robotic hardware under strict space and reliability constraints, including the ability to maintain flexion during operation. I own the module electronics: the custom flexible mainboards, the docking and addressing architecture, and the on-board actuation drivers, now in their fourth design iteration.

  - Iterated four generations of custom flexible PCBs, engineered to withstand extreme mechanical strain and high-angle bending without trace de-lamination.
  - Integrated dynamic I2C multiplexing and structural addressing onto individual docking faces, enabling interlocking actuator modules to autonomously discover and map neighboring orientation nodes.
  - Embedded localized motor drivers and transistor-driven solenoid arrays on-board, managing autonomous module interlocking and soft-actuator inflation cycles, supporting one forthcoming co-authorship.

specs:
  - label: "PCB Outline"
    value: "96 × 28mm, two-layer flexible PCB"
  - label: "Flexion Tolerance"
    value: "~1° sustained flexion without trace failure"
  - label: "Actuator Drivers"
    value: "DRV8833 motor drivers (reliability, availability, current capacity matched to actuators)"
  - label: "On-Board Actuation"
    value: "Transistor-driven solenoid arrays for interlocking + inflation cycles"
  - label: "Inter-Module Comms"
    value: "Dynamic I2C multiplexing, structural addressing per docking face"
  - label: "MCU Interface (V4)"
    value: "11-pin FPC connector to secondary microcontroller board"
  - label: "Assembly"
    value: "Hand SMD reflow (hot plate + heat gun), microscope-inspected"

configVideosLabel: "Demonstrations"
configVideosTitle: "Configuration Demonstrations"
configVideos:
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/videos/self-reconfiguration-demonstration.mp4"
    poster: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/self-reconfiguration-demonstration-poster.jpg"
    caption: "Self-reconfiguration: two module chains docking and re-forming their connection autonomously."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/videos/quadruped-configuration.mp4"
    poster: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/quadruped-configuration-poster.jpg"
    caption: "Quadruped configuration: modules interlocked into a four-limbed gait for locomotion testing."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/videos/rolling-configuration.mp4"
    poster: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/rolling-configuration-poster.jpg"
    caption: "Rolling configuration: modules chained into a closed loop for rolling-mode locomotion."

gallery:
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/layout_v1.jpg"
    caption: "Mainboard V1 layout: first-generation two-layer design with through-hole transistors and discrete interface pads. This revision required jumper-wire fixes after fabrication."
    tall: true
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/layout_v4.jpg"
    caption: "Mainboard V4 layout: the latest iteration, fully SMD with FPC interconnects, consolidated routing, and placement driven by the module's mechanical and flexion constraints."
    tall: true
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/schematic_v4.jpg"
    caption: "Mainboard V4 schematic: fully SMD signal routing with the 11-pin FPC connector to the secondary microcontroller board"
    tall: true
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/board_lineage.jpg"
    caption: "The mainboard lineage laid out: early flexible generations with hand-bodged fixes alongside the clean later revisions and their secondary microcontroller boards."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/board_panel.jpg"
    caption: "A production run of the latest mainboard revision, hand-assembled and ready for module integration."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/module_assembled.jpg"
    caption: "Assembled module with the latest mainboard installed: docking faces, PAC connectors, and actuation wiring integrated around the flexible board."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/two_modules.jpg"
    caption: "Two modules interlocked and powered over USB during intermodule communication bring-up."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/inflation_test.jpg"
    caption: "Module inflation test: the soft actuator pressurized with the docking hardware attached."
  - src: "Soft Robotics Research/soft_robotics_portfolio_section_overleaf/images/four_modules.jpg"
    caption: "Four modules with the latest mainboard revision installed, top-down view."

challenges: |
  #### Four Mainboard Generations

  The mainboard is now on its fourth iteration, and the progression is the clearest record of my growth as an electronics designer. The first board shipped with a few incorrect traces that had to be bridged with jumper wires, and used through-hole transistors that fought the space constraints. Each generation after that folded in the lessons of the last: verifying every net through design review before fabrication, moving fully to SMD to shrink the footprint and simplify assembly, replacing discrete microcontroller interface pads with a compact 11-pin FPC connector to a secondary microcontroller board, and consolidating the routing for reliability under repeated flexion. Comparing the V1 and V4 layouts shows how much the design matured: cleaner net organization, deliberate component placement, and a board designed to be manufactured and serviced, not just to work once.

  #### Autonomous Docking and On-Board Actuation

  Each docking face carries its own addressing hardware: dynamic I2C multiplexing and structural addressing let a module identify which neighbor is attached to which face and in what orientation, so a chain of interlocked modules can autonomously discover and map its own topology. The mainboard also embeds the actuation layer locally, with motor drivers and transistor-driven solenoid arrays managing the interlocking mechanisms and soft-actuator inflation cycles without external drive electronics.

  #### Assembly, Testing, and Validation

  All boards are hand-assembled in the lab using SMT techniques (hot plate and heat gun with solder paste) and inspected under a microscope for solder joint integrity and trace bridging. Electrical validation confirmed continuity and power integrity, and assembled modules have successfully powered their actuators under load with stable performance, including soft-actuator inflation testing. Extended flexion-cycle reliability testing is planned in the upcoming research phase.

  #### Collaboration and Research Impact

  I work alongside graduate researcher Joshua Knospler to keep the PCB form factor matched to the module mechanical design, and I assist in module assembly and hardware refinements. The PCB systems described here extend the group's published soft-robotics foundations by enabling more compact, manufacturable, and modular electronics integration within the modules. This contribution is included in a forthcoming publication on which I am a co-author, and the research is currently being evaluated for potential patenting and commercialization. The lab's prior published work is listed in full under Publications, below.
challengesTitle: "From a Bodged V1 to a Production-Ready V4"

publications:
  badge: "1 Forthcoming Co-Authorship"
  sectionTitle: "Research Group Publications"
  note: "My contribution to the module electronics is cited in a forthcoming publication on which I am a co-author, and the underlying research is currently under evaluation for patenting. The papers below are prior published work from the same research group (PI: Dr. Mitja Trkov), included for context."
  items:
    - authors: "J. Knospler, W. Xue, and M. Trkov"
      title: "Reconfigurable modular soft robots with modulating stiffness and versatile task capabilities"
      venue: "Smart Materials and Structures, vol. 33, no. 6, 2024"
    - authors: "J. Knospler, N. Pagliocca, W. Xue, and M. Trkov"
      title: "TendrilBot: Modular Soft Robot with Versatile Radial Grasping and Locomotion Capabilities"
      venue: "Sensors and Actuators A: Physical, 2024"
    - authors: "J. Knospler, W. Xue, and M. Trkov"
      title: "MagBot: Reconfigurable Modular Soft Pneumatic Actuators with Tunable Magnetic Connection Mechanism"
      venue: "IEEE AIM, 2024"
    - authors: "J. Knospler, W. Xue, and M. Trkov"
      title: "A Shared Electrical-Pneumatic and Reversible Locking Intermodule Connector for Modular Robots"
      venue: "IEEE AIM, 2024"
    - authors: "J. Knospler, N. Pagliocca, W. Xue, and M. Trkov"
      title: "Realizing Modular Self-reconfiguring Soft Robots through Inter-module Communication and Model Checking"
      venue: "IEEE RoboSoft, 2025"

results:
  narrative: |
    Electrical validation confirmed continuity and power integrity across the assembled boards, and assembled modules have successfully powered their actuators under load with stable performance, including soft-actuator inflation testing. Extended flexion-cycle reliability testing is planned for the upcoming research phase.

    The electronics contribution is included in a forthcoming co-authored publication, and the underlying research is currently under evaluation for patenting and commercialization.
  metrics:
    - value: "4"
      label: "Mainboard Generations (V1 → V4)"
    - value: "96×28mm"
      label: "Module PCB Footprint"
    - value: "~1°"
      label: "Sustained Flexion Tolerance"
    - value: "1"
      label: "Forthcoming Co-Authorship"
  table:
    headers: ["Item", "Status"]
    rows:
      - ["Mainboard generations", "4 (V1 → V4): through-hole/jumper-fixed to fully SMD + FPC"]
      - ["Module PCB footprint", "96 × 28mm, two-layer flex"]
      - ["Flexion tolerance", "~1° sustained without trace failure"]
      - ["Continuity / power-integrity check", "Confirmed on assembled boards"]
      - ["Actuator drive under load", "Stable, including a module pneumatic inflation test"]
      - ["Flexion-cycle reliability testing", "Planned for the upcoming research phase"]
      - ["Publication / IP status", "Cited in a forthcoming co-authored publication; underlying research under evaluation for patenting"]

nav:
  prev:
    slug: "foc-control-rig"
    title: "Field Oriented Control Test Bench"
  next:
    slug: "exoskeleton"
    title: "Fall-Prevention Exoskeleton"
