export type Language = "vi" | "en";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface LocalizedList {
  vi: string[];
  en: string[];
}

export interface AutomationImage {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface AutomationProjectBlock {
  id: string;
  code: string;
  category: "vision" | "plc-mes" | "hmi-desktop";
  categoryLabel: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  architectureNote: LocalizedText;
  highlights: LocalizedList;
  metrics: {
    label: LocalizedText;
    value: string;
  }[];
  techStack: string[];
  images: AutomationImage[];
}

export interface FeaturedProject {
  id: string;
  period: LocalizedText;
  teamSize: LocalizedText;
  role: LocalizedText;
  domain: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
  techStack: string[];
  detailUrl?: string;
  detailLabel?: LocalizedText;
  isAutomationUmbrella?: boolean;
}

export interface SideProjectImage {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  device: "desktop" | "mobile";
  isPlaceholder?: boolean;
}

export interface SideProjectMetric {
  label: LocalizedText;
  value: string;
}

export interface SideProject {
  id: string;
  code: string;
  kind: "web" | "game";
  tag: LocalizedText;
  menuTitle: LocalizedText;
  menuSummary: LocalizedText;
  status: LocalizedText;
  role: LocalizedText;
  platform: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  overview: LocalizedList;
  highlights: LocalizedList;
  metrics: SideProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  liveLabel?: LocalizedText;
  imageNote?: LocalizedText;
  images: SideProjectImage[];
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  items: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  institution: LocalizedText;
  program: LocalizedText;
  details: LocalizedList;
}

export const portfolioData = {
  profile: {
    name: "Lê Quốc Đạt",
    nameEn: "Le Quoc Dat",
    dob: "21/12/1998",
    gender: {
      vi: "Nam",
      en: "Male",
    },
    role: {
      vi: "Fullstack & Industrial Automation Software Engineer",
      en: "Fullstack & Industrial Automation Software Engineer",
    },
    tagline: {
      vi: "Kỹ sư phần mềm chuyên phát triển ứng dụng Fullstack Web/Desktop và các hệ thống Tự động hóa công nghiệp (kết nối PLC/MES, xử lý ảnh Camera công nghiệp hiệu năng cao).",
      en: "Software Engineer specializing in high-performance Fullstack Web/Desktop applications and Industrial Automation systems (PLC/MES integration, Industrial Camera & Machine Vision).",
    },
    objective: {
      vi: "Vận dụng tư duy lập trình và kỹ năng giải quyết bài toán thực tế để xây dựng các hệ thống phần mềm ổn định, hiệu năng cao — kết nối liền mạch từ tầng thiết bị công nghiệp (PLC, Camera) đến hệ thống Backend (.NET, Node.js) và giao diện điều khiển hiện đại (React, Next.js, Vue, Electron).",
      en: "Leverage strong programming and problem-solving skills to develop reliable, high-performance software systems — seamlessly bridging industrial hardware (PLC, Machine Vision) with scalable backends (.NET, Node.js) and modern web/desktop interfaces (React, Next.js, Vue, Electron).",
    },
    location: {
      vi: "Hà Nội, Việt Nam",
      en: "Hanoi, Vietnam",
    },
    phone: "0364261898",
    email: "quale.2112@gmail.com",
    github: "https://github.com/losertnaw1",
    githubHandle: "losertnaw1",
    status: {
      vi: "Sẵn sàng cho các cơ hội Software Engineer • Hà Nội",
      en: "Open to Software Engineer Opportunities • Hanoi, Vietnam",
    },
  },

  pipelineArchitecture: [
    {
      step: "01",
      layer: {
        vi: "Tầng Thiết bị & Dây chuyền (Edge / Field)",
        en: "Field Hardware & Production Line",
      },
      tech: "PLC • Industrial Camera • Sensors • Cross-Belt Sorters",
      desc: {
        vi: "Đọc/ghi thanh ghi PLC thời gian thực, nhận xung trigger chụp ảnh và thu thập tín hiệu cảm biến trên băng chuyền.",
        en: "Real-time PLC register polling/writing, high-speed camera hardware triggers, and conveyor sensor telemetry.",
      },
    },
    {
      step: "02",
      layer: {
        vi: "Tầng Xử lý Trung tâm & Backend",
        en: "Core Processing & Backend Services",
      },
      tech: "C# / .NET 6+ • Node.js / NestJS • Express • Erlang",
      desc: {
        vi: "Xử lý ảnh hậu kỳ (Post-image processing), điều phối luồng phân loại, đồng bộ MES và lưu trữ dữ liệu sản xuất.",
        en: "Post-image vision processing, sorting routing logic, MES synchronization, and high-throughput data aggregation.",
      },
    },
    {
      step: "03",
      layer: {
        vi: "Tầng Giao diện Điều khiển & Web (HMI / Client)",
        en: "Web Applications & Desktop Control HMI",
      },
      tech: "React.js • Next.js • Vue.js • TypeScript • Electron",
      desc: {
        vi: "Ứng dụng Desktop/Web trực quan giúp vận hành viên giám sát trạng thái dây chuyền, xem thống kê và cấu hình trực tiếp tại nhà máy.",
        en: "Responsive Web & Electron Desktop HMI for real-time line monitoring, alarm diagnostics, and production analytics.",
      },
    },
  ],

  skillGroups: [
    {
      id: "languages",
      title: {
        vi: "Ngôn ngữ Lập trình",
        en: "Programming Languages",
      },
      subtitle: {
        vi: "Đa nền tảng từ hệ thống công nghiệp tới ứng dụng Web",
        en: "Multi-paradigm across industrial systems and modern web",
      },
      items: ["TypeScript", "JavaScript (ES6+)", "C# / .NET 6+", "Node.js", "Erlang", "PHP"],
    },
    {
      id: "frontend-desktop",
      title: {
        vi: "Frontend & Desktop HMI",
        en: "Frontend & Desktop HMI",
      },
      subtitle: {
        vi: "Giao diện người dùng, Atomic Design & ứng dụng điều khiển",
        en: "Modern web interfaces, Atomic Design & desktop control apps",
      },
      items: ["React.js", "Next.js", "Vue.js", "Electron", "Tailwind CSS / SCSS", "Atomic Design System"],
    },
    {
      id: "backend-database",
      title: {
        vi: "Backend & Cơ sở dữ liệu",
        en: "Backend & Databases",
      },
      subtitle: {
        vi: "API hiệu năng cao, xử lý đa luồng & lưu trữ dữ liệu",
        en: "High-concurrency APIs, multi-threaded services & storage",
      },
      items: [".NET 6+ / C#", "NestJS", "Express.js", "SQL Server", "MySQL", "MongoDB", "Mnesia"],
    },
    {
      id: "industrial-tools",
      title: {
        vi: "Tự động hóa & Công cụ Kỹ thuật",
        en: "Industrial Automation & Engineering Tools",
      },
      subtitle: {
        vi: "Kết nối thiết bị nhà máy, xử lý ảnh & triển khai on-site",
        en: "Factory floor connectivity, machine vision & on-site deployment",
      },
      items: [
        "PLC Communication",
        "MES Data Integration",
        "Industrial Camera Vision",
        "Cross-Belt Sorting Systems",
        "Linux / MobaXterm",
        "Git / Postman / VS Code / Eclipse",
      ],
    },
  ] as SkillGroup[],

  featuredProjects: [
    {
      id: "industrial-support-system",
      period: {
        vi: "03/2024 — Hiện tại",
        en: "Mar 2024 — Present",
      },
      teamSize: {
        vi: "Team of 1 (Phụ trách End-to-End)",
        en: "Team of 1 (End-to-End Owner)",
      },
      role: {
        vi: "Fullstack & Industrial Automation Engineer",
        en: "Fullstack & Industrial Automation Engineer",
      },
      domain: {
        vi: "Tự động hóa Công nghiệp • PLC / MES • Machine Vision",
        en: "Industrial Automation • PLC / MES • Machine Vision",
      },
      title: {
        vi: "Hệ sinh thái Phần mềm Hỗ trợ & Tự động hóa Công nghiệp",
        en: "Industrial Support & Factory Automation Software Suite",
      },
      summary: {
        vi: "Phụ trách toàn diện chuỗi dự án phần mềm công nghiệp tại nhà máy: giao tiếp trực tiếp với PLC để quản lý trạng thái dây chuyền, thu thập & báo cáo dữ liệu sản xuất (MES), và tích hợp Camera công nghiệp xử lý ảnh cho hệ thống phân loại Cross-Belt Sorting.",
        en: "End-to-end ownership of multiple industrial software projects: PLC communication for production line status management, MES data collection/reporting, and industrial camera vision integration for cross-belt sorting systems.",
      },
      highlights: {
        vi: [
          "Giao tiếp PLC thời gian thực để giám sát trạng thái dây chuyền, thu thập, tổng hợp và xuất báo cáo sản lượng sản xuất.",
          "Tích hợp Camera công nghiệp và xử lý ảnh hậu kỳ (post-image processing) cho các hệ thống phân loại hàng hóa Cross-Belt Sorting.",
          "Phát triển hệ thống Backend hiệu năng cao bằng C# và .NET 6+, kết hợp giao diện Web/Desktop bằng React.js, TypeScript và Electron.",
          "Làm chủ toàn bộ vòng đời dự án: khảo sát yêu cầu cùng khách hàng, thiết kế kiến trúc, cài đặt on-site tại nhà máy, kiểm thử và tùy biến theo thực tế vận hành.",
        ],
        en: [
          "Implemented real-time PLC communication for production line status management, production data collection, aggregation, and reporting.",
          "Integrated industrial cameras and post-image processing pipelines for vision-based applications, primarily cross-belt sorting systems.",
          "Engineered core backend services with C# and .NET 6+ paired with modern Web/Desktop HMI built on React.js, TypeScript, and Electron.",
          "Owned the complete lifecycle: requirement analysis, direct customer communication, on-site factory installation, debugging, and customization.",
        ],
      },
      techStack: [
        "C# / .NET 6+",
        "React.js",
        "TypeScript",
        "Electron",
        "PLC Communication",
        "MES Integration",
        "Industrial Camera Vision",
        "SQL Server",
      ],
      detailUrl: "/automation",
      detailLabel: {
        vi: "Xem chi tiết các dự án Tự động hóa đã triển khai",
        en: "Explore Detailed Industrial Automation Projects",
      },
      isAutomationUmbrella: true,
    },
    {
      id: "hofuri-currency-trading",
      period: {
        vi: "08/2021 — 03/2024",
        en: "Aug 2021 — Mar 2024",
      },
      teamSize: {
        vi: "Team 30 thành viên",
        en: "Team of 30",
      },
      role: {
        vi: "Frontend / Web Application Engineer",
        en: "Frontend / Web Application Engineer",
      },
      domain: {
        vi: "FinTech • Hệ thống Giao dịch Tiền tệ",
        en: "FinTech • Currency Trading System",
      },
      title: {
        vi: "HOFURI — Hệ thống Giao dịch Tiền tệ Quy mô lớn",
        en: "HOFURI — Enterprise Currency Trading Platform",
      },
      summary: {
        vi: "Tham gia thiết kế chi tiết và phát triển giao diện ứng dụng Web cho hệ thống giao dịch tiền tệ quy mô 30 thành viên, xây dựng hệ thống Atomic Design đảm bảo tính nhất quán và khả năng mở rộng.",
        en: "Collaborated in a 30-person engineering team to design and build a high-reliability currency trading web application with a scalable Atomic Design System.",
      },
      highlights: {
        vi: [
          "Phối hợp thiết kế giao diện người dùng (UI) bằng việc xây dựng tài liệu thiết kế chi tiết (Detailed Design) từ bản thiết kế cơ sở của khách hàng.",
          "Đóng góp xây dựng hệ thống Atomic Design System giúp đồng bộ hóa component, tăng tốc độ phát triển và khả năng mở rộng toàn hệ thống.",
          "Phát triển và tối ưu hóa hiệu năng ứng dụng Web giao dịch tiền tệ sử dụng Vue.js.",
          "Phát hiện, phân tích và xử lý triệt để các vấn đề kỹ thuật để đảm bảo tính năng và hiệu năng khớp 100% với đặc tả chi tiết.",
        ],
        en: [
          "Collaborated in designing the user interface (UI) by creating detailed engineering specifications from client basic designs.",
          "Contributed to building a scalable Atomic Design System ensuring visual and functional consistency across trading modules.",
          "Developed and optimized the production web application using Vue.js.",
          "Identified and resolved functional and performance bottlenecks to strictly align with detailed design specifications.",
        ],
      },
      techStack: ["Vue.js", "JavaScript / TypeScript", "Atomic Design System", "SCSS / CSS3", "UI Detailed Design"],
    },
    {
      id: "vht-telecom-systems",
      period: {
        vi: "03/2021 — 07/2021",
        en: "Mar 2021 — Jul 2021",
      },
      teamSize: {
        vi: "Team 6 & 14 thành viên",
        en: "Teams of 6 & 14",
      },
      role: {
        vi: "System Software Developer",
        en: "System Software Developer",
      },
      domain: {
        vi: "Viễn thông • Hệ thống Cảnh báo & Luồng Bản tin",
        en: "Telecom • Alarm Signaling & Message Flow Systems",
      },
      title: {
        vi: "VHTMSC & VHTSMSC — Hệ thống Cảnh báo Phần cứng & Luồng Tin nhắn",
        en: "VHTMSC & VHTSMSC — Hardware Alarm Signaling & Message Flow Systems",
      },
      summary: {
        vi: "Phát triển và tối ưu hóa các chức năng xử lý đa luồng cho hệ thống luồng tin nhắn (VHTSMSC) và hệ thống phát tín hiệu cảnh báo lỗi phần cứng tức thời (VHTMSC) trên môi trường Linux.",
        en: "Developed and improved multi-threaded message flow subsystems (VHTSMSC) and hardware failure alarm signaling systems (VHTMSC) in Linux environments.",
      },
      highlights: {
        vi: [
          "VHTMSC (06/2021 – 07/2021, Team 6): Xây dựng mới và nâng cấp các chức năng phát tín hiệu cảnh báo sớm khi xảy ra sự cố phần cứng trên môi trường Linux.",
          "VHTSMSC (03/2021 – 06/2021, Team 14): Phát triển tính năng mới và tối ưu hóa các tiến trình/luồng xử lý (threads) của hệ thống truyền tải bản tin.",
          "Làm việc trực tiếp với môi trường máy chủ Linux, Terminal, Eclipse, Navicat, MobaXterm cùng ngôn ngữ Erlang và cơ sở dữ liệu phân tán Mnesia.",
        ],
        en: [
          "VHTMSC (Jun – Jul 2021, Team of 6): Built and improved real-time alarm signaling functions triggered upon hardware failures.",
          "VHTSMSC (Mar – Jun 2021, Team of 14): Created and optimized high-concurrency message flow functions and worker threads.",
          "Operated in Linux server environments utilizing Eclipse, Terminal, Navicat, MobaXterm, Erlang, and Mnesia.",
        ],
      },
      techStack: ["Erlang", "Mnesia", "Linux Terminal", "Multi-threading", "Eclipse", "MobaXterm", "Navicat"],
    },
  ] as FeaturedProject[],

  /**
   * ============================================================================
   * DANH SÁCH CHI TIẾT CÁC DỰ ÁN TỰ ĐỘNG HÓA (TRANG /automation)
   * Mỗi phần tử dưới đây sẽ tự động hiển thị thành 1 Block độc lập gồm:
   * - Khung ảnh / sơ đồ (hỗ trợ nhiều ảnh + click phóng to Lightbox)
   * - Tiêu đề, Thời gian, Vai trò, Mô tả chi tiết, Điểm nhấn kỹ thuật & Tech Stack
   * Bạn có thể dễ dàng sửa nội dung hoặc copy thêm object mới vào mảng này!
   * ============================================================================
   */
  automationProjects: [
    {
      id: "cross-belt-sorting-vision",
      code: "AUTO-01",
      category: "vision",
      categoryLabel: {
        vi: "Camera Vision & Phân loại",
        en: "Machine Vision & Sorting",
      },
      period: {
        vi: "2024 — Hiện tại",
        en: "2024 — Present",
      },
      role: {
        vi: "End-to-End Software Engineer (Team of 1)",
        en: "End-to-End Software Engineer (Team of 1)",
      },
      title: {
        vi: "Hệ thống Tích hợp Camera Công nghiệp & Phân loại Cross-Belt Sorting",
        en: "Industrial Camera Vision & Cross-Belt Sorting Control System",
      },
      summary: {
        vi: "Hệ thống kết hợp Camera công nghiệp tốc độ cao và bộ điều khiển PLC để nhận diện kiện hàng, xử lý ảnh hậu kỳ và điều hướng phân loại tự động trên dây chuyền Cross-Belt.",
        en: "Integrated high-speed industrial cameras with PLC controllers for real-time parcel identification, post-image processing, and automated chute routing on cross-belt sorting lines.",
      },
      architectureNote: {
        vi: "Camera Công nghiệp (Trigger) ➔ Xử lý ảnh hậu kỳ (.NET 6+) ➔ Đồng bộ PLC ➔ Điều khiển máng xả Cross-Belt & Hiển thị HMI (React/Electron)",
        en: "Industrial Camera (Hardware Trigger) ➔ Post-Image Pipeline (.NET 6+) ➔ PLC Sync ➔ Cross-Belt Chute Actuation & Electron/React HMI",
      },
      highlights: {
        vi: [
          "Tích hợp SDK Camera công nghiệp nhận tín hiệu trigger phần cứng khi kiện hàng đi qua vùng quét tốc độ cao.",
          "Xây dựng pipeline xử lý ảnh hậu kỳ (post-image processing) bằng C#/.NET 6+ để đọc mã, kiểm tra vùng ảnh và trích xuất thông tin kiện hàng.",
          "Giao tiếp độ trễ thấp với PLC để gửi mã máng phân loại (Chute ID) đồng bộ chính xác với xung encoder của băng tải Cross-Belt.",
          "Trực tiếp lắp đặt, cân chỉnh tại hiện trường (on-site), xử lý nhiễu ánh sáng nhà xưởng và tối ưu độ chính xác phân loại.",
        ],
        en: [
          "Integrated industrial camera SDKs with hardware triggers for high-speed parcel capture on moving conveyors.",
          "Built a C#/.NET 6+ post-image processing pipeline to normalize frames, decode identifiers, and validate parcel regions.",
          "Implemented low-latency PLC communication to dispatch target chute IDs synchronized with conveyor encoder pulses.",
          "Executed on-site installation, calibration under factory lighting conditions, and end-to-end tuning with customer operations teams.",
        ],
      },
      metrics: [
        {
          label: { vi: "Độ trễ xử lý", en: "Processing Latency" },
          value: "< 15 ms",
        },
        {
          label: { vi: "Quy mô phụ trách", en: "Ownership" },
          value: "End-to-End",
        },
        {
          label: { vi: "Môi trường", en: "Deployment" },
          value: "On-Site 24/7",
        },
      ],
      techStack: [
        "C# / .NET 6+",
        "Industrial Camera SDK",
        "Post-Image Processing",
        "PLC Communication",
        "Cross-Belt Sorting",
        "React.js",
        "Electron",
      ],
      images: [
        {
          src: "/images/automation/cross-belt-vision.svg",
          alt: {
            vi: "Sơ đồ kiến trúc hệ thống Cross-Belt Sorting và Camera Vision",
            en: "Cross-Belt Sorting and Industrial Camera Vision Architecture",
          },
          caption: {
            vi: "Kiến trúc kết nối Camera công nghiệp, PLC và Core Engine (.NET 6+) cho dây chuyền Cross-Belt Sorting",
            en: "Architecture linking Industrial Camera, PLC, and .NET 6+ Core Engine for Cross-Belt Sorting",
          },
        },
        {
          src: "/images/automation/camera-post-processing.svg",
          alt: {
            vi: "Pipeline xử lý ảnh hậu kỳ từ Camera công nghiệp",
            en: "Industrial Camera Post-Image Processing Pipeline",
          },
          caption: {
            vi: "Quy trình xử lý ảnh hậu kỳ (ROI detection, chuẩn hóa ánh sáng, giải mã và đồng bộ kết quả xuống PLC)",
            en: "Post-image processing pipeline (ROI detection, lighting normalization, decoding, and PLC dispatch)",
          },
        },
      ],
    },
    {
      id: "plc-production-line-mes",
      code: "AUTO-02",
      category: "plc-mes",
      categoryLabel: {
        vi: "Kết nối PLC & MES",
        en: "PLC & MES Telemetry",
      },
      period: {
        vi: "2024 — Hiện tại",
        en: "2024 — Present",
      },
      role: {
        vi: "Fullstack & Automation Engineer (Team of 1)",
        en: "Fullstack & Automation Engineer (Team of 1)",
      },
      title: {
        vi: "Hệ thống Quản lý Trạng thái Dây chuyền PLC & Thu thập Dữ liệu Sản xuất (MES)",
        en: "PLC Production Line Status Management & MES Data Aggregation Platform",
      },
      summary: {
        vi: "Giải pháp kết nối trực tiếp với hệ thống PLC trên dây chuyền sản xuất để theo dõi trạng thái vận hành thời gian thực, thu thập sản lượng, tổng hợp dữ liệu và xuất báo cáo phục vụ quản trị sản xuất (MES).",
        en: "Real-time industrial data platform connecting directly to factory PLCs to monitor line health, collect production counters, aggregate shift metrics, and generate MES reports.",
      },
      architectureNote: {
        vi: "Multi-PLC Lines ➔ .NET 6+ Data Collector & Queue ➔ SQL Server ➔ React/TypeScript Web Dashboard & MES Reporting",
        en: "Multi-PLC Lines ➔ .NET 6+ Data Collector & Queue ➔ SQL Server ➔ React/TypeScript Web Dashboard & MES Reporting",
      },
      highlights: {
        vi: [
          "Thiết kế module giao tiếp PLC đọc/ghi thanh ghi liên tục với cơ chế tự động kết nối lại (auto-reconnect) và bộ đệm chống mất dữ liệu khi rớt mạng nội bộ.",
          "Thu thập trạng thái máy (Chạy, Dừng, Cảnh báo lỗi), đếm sản lượng theo ca/mã hàng và tổng hợp thành báo cáo hiệu suất dây chuyền.",
          "Xây dựng Dashboard Web trực quan bằng React.js và TypeScript giúp quản đốc theo dõi toàn bộ dây chuyền theo thời gian thực và xuất báo cáo Excel/MES.",
          "Tùy biến linh hoạt logic tổng hợp dữ liệu theo yêu cầu đặc thù của từng nhà máy khi triển khai thực tế.",
        ],
        en: [
          "Engineered resilient PLC polling/writing services with auto-reconnect and local buffering to guarantee zero data loss during network micro-drops.",
          "Captured real-time machine states (Run, Stop, Fault Alarms) and production counters for shift-level aggregation.",
          "Built an interactive React.js + TypeScript web dashboard for live factory floor visualization and automated MES report generation.",
          "Customized aggregation rules and reporting schemas directly on-site based on factory management requirements.",
        ],
      },
      metrics: [
        {
          label: { vi: "Chu kỳ đọc PLC", en: "PLC Polling Cycle" },
          value: "Real-time",
        },
        {
          label: { vi: "Độ tin cậy dữ liệu", en: "Data Integrity" },
          value: "Buffered Queue",
        },
        {
          label: { vi: "Giao diện", en: "Client Interface" },
          value: "Web + Desktop",
        },
      ],
      techStack: [
        "C# / .NET 6+",
        "PLC Protocols",
        "MES Reporting",
        "React.js",
        "TypeScript",
        "SQL Server",
        "REST / WebSocket",
      ],
      images: [
        {
          src: "/images/automation/plc-mes-telemetry.svg",
          alt: {
            vi: "Sơ đồ thu thập dữ liệu PLC và tổng hợp báo cáo MES",
            en: "PLC Data Collection and MES Reporting Diagram",
          },
          caption: {
            vi: "Luồng thu thập dữ liệu từ nhiều nhánh PLC về bộ tổng hợp .NET 6+ và hiển thị trên Dashboard MES",
            en: "Multi-line PLC telemetry aggregation via .NET 6+ worker services into the React MES Dashboard",
          },
        },
      ],
    },
    {
      id: "vision-post-processing-suite",
      code: "AUTO-03",
      category: "vision",
      categoryLabel: {
        vi: "Xử lý ảnh Công nghiệp",
        en: "Industrial Image Processing",
      },
      period: {
        vi: "2024 — Hiện tại",
        en: "2024 — Present",
      },
      role: {
        vi: "Vision & Backend Software Engineer",
        en: "Vision & Backend Software Engineer",
      },
      title: {
        vi: "Module Xử lý Ảnh Hậu kỳ & Chẩn đoán Hình ảnh Camera Công nghiệp",
        en: "Industrial Camera Post-Image Processing & Diagnostic Engine",
      },
      summary: {
        vi: "Bộ công cụ xử lý ảnh sau khi chụp từ Camera công nghiệp, hỗ trợ cắt vùng quan tâm (ROI), tăng cường độ tương phản, lưu trữ ảnh lỗi để truy vết và tinh chỉnh thông số nhận diện ngay tại dây chuyền.",
        en: "Specialized post-image processing engine for industrial cameras supporting ROI cropping, contrast enhancement, fault-frame archiving for traceability, and on-site parameter tuning.",
      },
      architectureNote: {
        vi: "Raw Camera Frame ➔ C#/.NET Image Pipeline ➔ Pass/Fail Classification & Archive ➔ UI Inspection Viewer",
        en: "Raw Camera Frame ➔ C#/.NET Image Pipeline ➔ Pass/Fail Classification & Archive ➔ UI Inspection Viewer",
      },
      highlights: {
        vi: [
          "Tối ưu hóa bộ nhớ và luồng xử lý ảnh hậu kỳ (multi-threaded image pipeline) để không làm nghẽn tốc độ chụp liên tục của camera trên băng chuyền.",
          "Tự động gắn nhãn, nén và lưu trữ hình ảnh các ca đọc lỗi (No-Read / Reject) kèm timestamp và trạng thái PLC để kỹ sư dễ dàng phân tích nguyên nhân.",
          "Cung cấp giao diện trực quan cho phép xem lại lịch sử ảnh chụp, đối chiếu kết quả nhận diện và tinh chỉnh ngưỡng xử lý ngay tại hiện trường.",
        ],
        en: [
          "Optimized memory allocation and multi-threaded post-image processing to sustain continuous high-FPS camera capture without frame drops.",
          "Automated tagging, compression, and archiving of No-Read/Reject frames alongside PLC timestamps for root-cause traceability.",
          "Provided a visual inspection tool to replay captured frames, verify recognition overlays, and fine-tune parameters on-site.",
        ],
      },
      metrics: [
        {
          label: { vi: "Xử lý đa luồng", en: "Concurrency" },
          value: "Multi-threaded",
        },
        {
          label: { vi: "Truy vết ảnh lỗi", en: "Traceability" },
          value: "100% Archived",
        },
        {
          label: { vi: "Tích hợp", en: "Integration" },
          value: "Camera + PLC",
        },
      ],
      techStack: [
        "C# / .NET 6+",
        "Image Processing",
        "Industrial Camera",
        "Multi-threading",
        "React.js",
        "TypeScript",
      ],
      images: [
        {
          src: "/images/automation/camera-post-processing.svg",
          alt: {
            vi: "Pipeline xử lý ảnh hậu kỳ và truy vết ảnh Camera công nghiệp",
            en: "Industrial Camera Post-Image Processing and Traceability",
          },
          caption: {
            vi: "Cấu trúc xử lý vùng ROI, phân loại kết quả và lưu trữ truy vết hình ảnh công nghiệp",
            en: "ROI extraction, classification overlay, and automated audit archiving pipeline",
          },
        },
      ],
    },
    {
      id: "electron-factory-control-hmi",
      code: "AUTO-04",
      category: "hmi-desktop",
      categoryLabel: {
        vi: "Ứng dụng Desktop / HMI",
        en: "Desktop HMI & On-Site Control",
      },
      period: {
        vi: "2024 — Hiện tại",
        en: "2024 — Present",
      },
      role: {
        vi: "Fullstack Desktop & HMI Engineer",
        en: "Fullstack Desktop & HMI Engineer",
      },
      title: {
        vi: "Phần mềm Điều khiển & Giám sát Trạm Vận hành Nhà máy (Electron + React + .NET)",
        en: "On-Site Factory Operator HMI & Control Station (Electron + React + .NET)",
      },
      summary: {
        vi: "Ứng dụng Desktop đa nền tảng chạy trực tiếp trên máy tính công nghiệp (IPC) tại nhà máy, đóng vai trò bảng điều khiển trung tâm (HMI) kết nối Backend .NET, PLC và Camera.",
        en: "Cross-platform desktop HMI running on factory Industrial PCs (IPCs), providing operators and engineers with real-time control, live telemetry, and hardware diagnostics.",
      },
      architectureNote: {
        vi: "Industrial PC (Electron + React + TypeScript) ⇄ Local/LAN .NET 6+ Core Service ⇄ PLC & Vision Hardware",
        en: "Industrial PC (Electron + React + TypeScript) ⇄ Local/LAN .NET 6+ Core Service ⇄ PLC & Vision Hardware",
      },
      highlights: {
        vi: [
          "Xây dựng giao diện vận hành bằng React.js, TypeScript đóng gói trên Electron, tối ưu cho màn hình cảm ứng và máy tính công nghiệp (IPC) hoạt động 24/7.",
          "Hiển thị sơ đồ trạng thái từng máng phân loại, đèn báo kết nối PLC/Camera, cảnh báo lỗi thời gian thực và nhật ký sự kiện (Event Logs).",
          "Tích hợp các công cụ kiểm thử (Manual Trigger, Test Chute, PLC I/O Monitor) giúp quá trình lắp đặt, nghiệm thu và bảo trì tại nhà máy nhanh gấp nhiều lần.",
        ],
        en: [
          "Built a responsive operator interface with React.js and TypeScript packaged in Electron for 24/7 Industrial PC (IPC) operation.",
          "Visualized live chute statuses, PLC/Camera connection health indicators, real-time fault alarms, and searchable event streams.",
          "Embedded engineering diagnostic tools (Manual Trigger, Chute Test, PLC I/O Inspector) that dramatically accelerated on-site commissioning and debugging.",
        ],
      },
      metrics: [
        {
          label: { vi: "Nền tảng trạm", en: "Target Platform" },
          value: "Industrial PC",
        },
        {
          label: { vi: "Công nghệ UI", en: "UI Stack" },
          value: "Electron + React",
        },
        {
          label: { vi: "Chế độ vận hành", en: "Operation Mode" },
          value: "24/7 Continuous",
        },
      ],
      techStack: [
        "Electron",
        "React.js",
        "TypeScript",
        "C# / .NET 6+",
        "WebSocket / IPC",
        "PLC Diagnostics",
      ],
      images: [
        {
          src: "/images/automation/factory-hmi-electron.svg",
          alt: {
            vi: "Giao diện phần mềm điều khiển HMI trên Electron và React",
            en: "Electron and React Industrial Control HMI Interface",
          },
          caption: {
            vi: "Mô phỏng màn hình điều khiển HMI tại trạm vận hành nhà máy: giám sát máng xả, trạng thái PLC và luồng sự kiện",
            en: "Operator HMI station view: live chute grid, PLC connection telemetry, and real-time event stream",
          },
        },
      ],
    },
  ] as AutomationProjectBlock[],

  /**
   * ============================================================================
   * DỰ ÁN CÁ NHÂN / SIDE PROJECTS (TRANG /side-projects)
   * Mỗi object render thành 1 block: gallery ảnh + overview + tech stack.
   * Ảnh Lucinox là ảnh chụp thật từ lucinox.vercel.app (public/images/side-projects).
   * Ảnh Miner's Haven là placeholder — chỉ cần thay file .svg bằng ảnh in-game thật.
   * ============================================================================
   */
  sideProjects: [
    {
      id: "lucinox-web-templates",
      code: "SIDE-01",
      kind: "web",
      tag: {
        vi: "Nền tảng mẫu website",
        en: "Web Template Platform",
      },
      menuTitle: {
        vi: "Lucinox — Mẫu Website",
        en: "Lucinox — Website Templates",
      },
      menuSummary: {
        vi: "Thư viện mẫu website dựng sẵn, có demo chạy trực tiếp và chuyển Sáng/Tối.",
        en: "A gallery of ready-made website templates with live demos and light/dark themes.",
      },
      status: {
        vi: "Đang trực tuyến",
        en: "Live",
      },
      role: {
        vi: "Thiết kế & Phát triển",
        en: "Design & Development",
      },
      platform: {
        vi: "Web • Next.js trên Vercel",
        en: "Web • Next.js on Vercel",
      },
      title: {
        vi: "Lucinox — Thư viện Mẫu Website Hiện đại",
        en: "Lucinox — Modern Website Template Gallery",
      },
      summary: {
        vi: "Sản phẩm web giới thiệu và phân phối các mẫu website dựng sẵn: từ landing page ứng dụng, cửa hàng thương mại điện tử đến portfolio và trang doanh nghiệp. Mỗi mẫu đều có trang demo chạy thật để xem trước, hỗ trợ song ngữ Việt/Anh và chuyển đổi giao diện Sáng/Tối.",
        en: "A web product presenting pre-built website templates — from app landing pages and online stores to portfolios and business sites. Every template ships with a live demo page, bilingual VI/EN copy, and light/dark theme switching.",
      },
      overview: {
        vi: [
          "Thư viện mẫu dựng sẵn cho nhiều mục đích: landing page ứng dụng, thương mại điện tử (thời trang, nội thất, thực phẩm hữu cơ, thiết bị công nghệ), hồ sơ năng lực và trang doanh nghiệp.",
          "Bộ lọc theo danh mục (Ứng dụng, Mua sắm, Ẩm thực, Y tế, Đám cưới, Hồ sơ năng lực, Doanh nghiệp, Giáo dục, Blog, Trang đích) kèm phân trang giúp duyệt mẫu nhanh.",
          "Mỗi mẫu có trang demo mở trực tiếp trên trình duyệt, xem trước đầy đủ bố cục, màu sắc và nhịp điệu trước khi chọn.",
          "Trang giới thiệu người sáng tạo với thanh kỹ năng, timeline kinh nghiệm làm việc, form liên hệ và chat widget hỗ trợ khách hàng.",
          "Toàn bộ giao diện responsive từ điện thoại tới desktop, có thanh điều hướng dạng floating pill và hiệu ứng hero gradient.",
        ],
        en: [
          "A library of ready-to-use templates for many purposes: app landing pages, e-commerce (fashion, furniture, organic goods, tech gadgets), personal portfolios, and business sites.",
          "Category filtering (App, Shopping, Food, Health, Wedding, Portfolio, Business, Education, Blog, Landing) with pagination for fast browsing.",
          "Each template links to a live demo page so visitors can inspect the real layout, colors, and motion before choosing.",
          "A creator profile section with skill bars, a work-experience timeline, a contact form, and a chat support widget.",
          "Fully responsive from phone to desktop, with a floating-pill navigation bar and a gradient hero section.",
        ],
      },
      highlights: {
        vi: [
          "Hero section + thanh điều hướng floating pill, chuyển đổi ngôn ngữ VI/EN và theme Sáng/Tối.",
          "Gallery mẫu dạng card với ảnh xem trước, lọc danh mục và phân trang (7 trang demo).",
          "Các trang demo tĩnh chạy thật: Modern App Landing (FitLife) và ShopHub e-commerce.",
          "Trang About người sáng tạo với thanh kỹ năng và timeline kinh nghiệm.",
          "Form liên hệ, chat widget và footer mạng xã hội.",
        ],
        en: [
          "Hero section with floating-pill navigation, VI/EN language switch, and light/dark theme toggle.",
          "Card-based template gallery with preview images, category filters, and pagination (7 demo pages).",
          "Real static demo pages: Modern App Landing (FitLife) and ShopHub e-commerce.",
          "Creator about section with animated skill bars and a work-experience timeline.",
          "Contact form, chat support widget, and social footer.",
        ],
      },
      metrics: [
        {
          label: { vi: "Mẫu giao diện", en: "Templates" },
          value: "7+",
        },
        {
          label: { vi: "Danh mục", en: "Categories" },
          value: "10",
        },
        {
          label: { vi: "Ngôn ngữ", en: "Languages" },
          value: "VI / EN",
        },
      ],
      techStack: ["Next.js", "React", "TypeScript", "Vercel", "Responsive UI", "Light / Dark Theme"],
      liveUrl: "https://lucinox.vercel.app",
      liveLabel: {
        vi: "Mở website trực tiếp",
        en: "Open Live Website",
      },
      images: [
        {
          src: "/images/side-projects/lucinox-hero.jpg",
          device: "desktop",
          alt: {
            vi: "Trang chủ Lucinox với hero Mẫu Website Cho Đám Cưới Của Bạn",
            en: "Lucinox homepage hero: website templates for your wedding",
          },
          caption: {
            vi: "Hero section với tiêu đề chuyển động, CTA Xem Mẫu / Liên Hệ và thanh điều hướng floating pill",
            en: "Hero section with animated headline, Explore/Contact CTAs, and a floating-pill navigation bar",
          },
        },
        {
          src: "/images/side-projects/lucinox-templates.jpg",
          device: "desktop",
          alt: {
            vi: "Thư viện mẫu website Lucinox với bộ lọc danh mục và phân trang",
            en: "Lucinox template gallery with category filters and pagination",
          },
          caption: {
            vi: "Thư viện mẫu dạng card: ảnh xem trước, danh mục, bộ lọc và phân trang 1/7",
            en: "Card-based template gallery: preview thumbnails, categories, filters, and 1/7 pagination",
          },
        },
        {
          src: "/images/side-projects/lucinox-demo-app.jpg",
          device: "desktop",
          alt: {
            vi: "Trang demo mẫu Modern App Landing FitLife của Lucinox",
            en: "Lucinox Modern App Landing demo page (FitLife)",
          },
          caption: {
            vi: "Trang demo thật của mẫu Modern App Landing — landing page ứng dụng thể thao FitLife",
            en: "Live demo of the Modern App Landing template — the FitLife fitness app landing page",
          },
        },
        {
          src: "/images/side-projects/lucinox-demo-furniture.jpg",
          device: "desktop",
          alt: {
            vi: "Trang demo mẫu thương mại điện tử Furniture Boutique của Lucinox",
            en: "Lucinox Furniture Boutique e-commerce demo page",
          },
          caption: {
            vi: "Trang demo thương mại điện tử ShopHub — mẫu Furniture Boutique với hero cam gradient",
            en: "ShopHub e-commerce demo — the Furniture Boutique template with an orange gradient hero",
          },
        },
        {
          src: "/images/side-projects/lucinox-about.jpg",
          device: "desktop",
          alt: {
            vi: "Khu giới thiệu người sáng tạo Lucinox với thanh kỹ năng và timeline kinh nghiệm",
            en: "Lucinox creator about section with skill bars and experience timeline",
          },
          caption: {
            vi: "Khu giới thiệu người sáng tạo: thanh kỹ năng UI/UX, Frontend, Kiến trúc hệ thống và timeline kinh nghiệm",
            en: "Creator profile: UI/UX, frontend, and system-architecture skill bars beside a work timeline",
          },
        },
        {
          src: "/images/side-projects/lucinox-mobile-templates.jpg",
          device: "mobile",
          alt: {
            vi: "Giao diện Lucinox trên điện thoại với gallery mẫu một cột",
            en: "Lucinox mobile layout with a single-column template gallery",
          },
          caption: {
            vi: "Bố cục mobile: gallery mẫu gập về một cột nhưng vẫn giữ ảnh xem trước và thông tin mẫu",
            en: "Mobile layout: the template gallery collapses to one column while keeping previews and metadata",
          },
        },
      ],
    },
    {
      id: "miners-haven",
      code: "SIDE-02",
      kind: "game",
      tag: {
        vi: "Game Roblox",
        en: "Roblox Game",
      },
      menuTitle: {
        vi: "Miner's Haven — Game Roblox",
        en: "Miner's Haven — Roblox Game",
      },
      menuSummary: {
        vi: "Game tycoon khai thác mỏ: xây căn cứ, nâng cấp quặng và mở rộng dây chuyền.",
        en: "A mining tycoon game: build your base, upgrade ore, and expand the production line.",
      },
      status: {
        vi: "Dự án cá nhân",
        en: "Personal Project",
      },
      role: {
        vi: "Game Design & Phát triển",
        en: "Game Design & Development",
      },
      platform: {
        vi: "Roblox • PC / Mobile / Console",
        en: "Roblox • PC / Mobile / Console",
      },
      title: {
        vi: "Miner's Haven — Tycoon Khai thác Mỏ trên Roblox",
        en: "Miner's Haven — Roblox Mining Tycoon",
      },
      summary: {
        vi: "Miner's Haven là game tycoon khai thác mỏ trên Roblox: người chơi bắt đầu với một căn cứ nhỏ, đặt dropper sinh quặng, dẫn quặng qua conveyor tới upgrader và lò nung để nhân giá trị, rồi bán lấy tiền mở rộng dây chuyền và mở khoá những loại quặng quý hơn.",
        en: "Miner's Haven is a mining tycoon game on Roblox: start with a small base, place droppers that spawn ore, route ore through conveyors, upgraders, and furnaces to multiply its value, then sell it to expand your setup and unlock rarer ores.",
      },
      overview: {
        vi: [
          "Vòng lặp chính: dropper sinh quặng → conveyor vận chuyển → upgrader và lò nung nhân giá trị → bán lấy tiền để nâng cấp căn cứ.",
          "Xây dựng căn cứ trên đảo riêng: đặt, xoay và nâng cấp từng thiết bị để tối ưu dây chuyền sản xuất.",
          "Càng về sau càng mở khoá thêm quặng hiếm và thiết bị đắt tiền, dây chuyền dài hơn và giá trị mỗi viên quặng cao hơn.",
          "Chơi trực tiếp trên Roblox với PC, mobile và console — không cần cài đặt, có thể vào chơi cùng bạn bè.",
        ],
        en: [
          "Core loop: droppers spawn ore → conveyors move it → upgraders and furnaces multiply its value → sell for cash to upgrade the base.",
          "Base building on a private island: place, rotate, and upgrade each machine to optimize the production line.",
          "Long-term progression unlocks rarer ores and more expensive machines, resulting in longer lines and higher ore value.",
          "Playable directly on Roblox across PC, mobile, and console — no install required, easy to hop in with friends.",
        ],
      },
      highlights: {
        vi: [
          "Dropper tự động sinh quặng, conveyor vận chuyển liên tục tới các trạm xử lý.",
          "Upgrader và lò nung cộng dồn hệ số nhân giá trị quặng.",
          "Hệ thống tiền tệ, nâng cấp thiết bị và mở rộng căn cứ theo từng cấp.",
          "Tiến trình mở khoá quặng và thiết bị mới theo thời gian chơi.",
        ],
        en: [
          "Droppers automatically spawn ore while conveyors feed it through processing stations.",
          "Upgraders and furnaces stack multipliers onto each ore's value.",
          "Currency, machine upgrades, and base expansion across multiple tiers.",
          "Progressive unlocks of new ores and machines as you play.",
        ],
      },
      metrics: [
        {
          label: { vi: "Thể loại", en: "Genre" },
          value: "Mining Tycoon",
        },
        {
          label: { vi: "Nền tảng", en: "Platform" },
          value: "Roblox",
        },
        {
          label: { vi: "Lối chơi", en: "Play Style" },
          value: "Base Building",
        },
      ],
      techStack: ["Roblox Studio", "Luau", "Game Design", "Tycoon / Idle Economy"],
      imageNote: {
        vi: "Ảnh bên dưới là placeholder mình đang tạm dùng — sẽ thay bằng ảnh chụp in-game thật sau.",
        en: "The images below are placeholders for now — they will be replaced with real in-game screenshots.",
      },
      images: [
        {
          src: "/images/side-projects/miners-haven-base.svg",
          device: "desktop",
          isPlaceholder: true,
          alt: {
            vi: "Ảnh placeholder căn cứ khai thác trong Miner's Haven",
            en: "Placeholder image of a Miner's Haven mining base",
          },
          caption: {
            vi: "Placeholder — toàn cảnh căn cứ và dây chuyền quặng trên đảo",
            en: "Placeholder — overview of the island base and ore production line",
          },
        },
        {
          src: "/images/side-projects/miners-haven-ore-line.svg",
          device: "desktop",
          isPlaceholder: true,
          alt: {
            vi: "Ảnh placeholder dây chuyền conveyor và upgrader trong Miner's Haven",
            en: "Placeholder image of Miner's Haven conveyors and upgraders",
          },
          caption: {
            vi: "Placeholder — dropper, conveyor, upgrader và lò nung xếp thành một dây chuyền",
            en: "Placeholder — droppers, conveyors, upgraders, and furnaces arranged in a line",
          },
        },
        {
          src: "/images/side-projects/miners-haven-progression.svg",
          device: "desktop",
          isPlaceholder: true,
          alt: {
            vi: "Ảnh placeholder màn hình nâng cấp và tiến trình trong Miner's Haven",
            en: "Placeholder image of Miner's Haven upgrades and progression UI",
          },
          caption: {
            vi: "Placeholder — màn hình nâng cấp thiết bị và tiến trình mở khoá quặng mới",
            en: "Placeholder — machine upgrade shop and new-ore unlock progression",
          },
        },
      ],
    },
  ] as SideProject[],

  educationAndTraining: [
    {
      id: "thuy-loi-university",
      period: "09/2017 — 09/2023",
      institution: {
        vi: "Đại học Thủy Lợi (Thuy Loi University)",
        en: "Thuy Loi University",
      },
      program: {
        vi: "Chuyên ngành: Công nghệ Thông tin (Information Technology)",
        en: "Major: Information Technology",
      },
      details: {
        vi: [
          "Nền tảng kỹ thuật phần mềm, cấu trúc dữ liệu & giải thuật, mạng máy tính và cơ sở dữ liệu.",
        ],
        en: [
          "Core computer science foundation in software engineering, data structures, networking, and relational databases.",
        ],
      },
    },
    {
      id: "fpt-software-academy",
      period: "09/2021 — 03/2022",
      institution: {
        vi: "FPT Software Academy",
        en: "FPT Software Academy",
      },
      program: {
        vi: "Fresher NodeJS Program",
        en: "Fresher NodeJS Training & Internship",
      },
      details: {
        vi: [
          "Đào tạo chuyên sâu và thực hành xây dựng ứng dụng Web Frontend & RESTful API với HTML5, CSS3, Bootstrap 4, JavaScript, Node.js, Express.js.",
          "Rèn luyện kỹ năng giao tiếp tiếng Anh trong công việc (mục tiêu TOEIC 700), viết email chuyên nghiệp và làm việc nhóm theo quy trình dự án.",
        ],
        en: [
          "Intensive fullstack training in HTML5, CSS3, Bootstrap 4, JavaScript, Node.js, and Express.js API development.",
          "Professional English communication (TOEIC 700 target), technical email writing, and agile teamwork.",
        ],
      },
    },
    {
      id: "edso-labs",
      period: "05/2021 — 07/2021",
      institution: {
        vi: "Công ty Cổ phần Edso Labs (Edso Labs JSC)",
        en: "Edso Labs Joint Stock Company",
      },
      program: {
        vi: "Frontend Developer Intern",
        en: "Frontend Developer Intern",
      },
      details: {
        vi: [
          "Nghiên cứu và phát triển ứng dụng giao diện với Vue.js và SCSS.",
          "Chuyển đổi bản thiết kế từ Figma sang mã nguồn giao diện chuẩn xác, có tính tái sử dụng cao.",
        ],
        en: [
          "Built interactive frontend components using Vue.js and SCSS.",
          "Translated Figma UI designs into clean, responsive CSS/SCSS code.",
        ],
      },
    },
  ] as EducationItem[],
};

