import { IProject } from "@/interfaces/IProject";

export const MockProjects: IProject[] = [
  {
    id: "1",
    title: "Feeding Hope",
    resume:
      "Providing daily nutritious meals to children in vulnerable Latin American communities.",
    description:
      "Feeding Hope brings healthy, balanced meals to children in vulnerable communities across Latin America. This project ensures food security, supports school attendance, and promotes physical and emotional well-being. Every plate served means a step toward a stronger and healthier generation.",
    country: "Guatemala",
    goalAmount: 50000,
    currentAmount: 32000,
    imageUrls: [
      "https://www.henkel.es/resource/image/1124140/16x9/1920/1098/8c7739889076c6bbb295328959533e6e/7B165B5BF5647DDBEF6C79647FA4F6A9/proyectos-sociales-stage-jpg.webp",
      "https://cdn.pixabay.com/photo/2023/02/14/04/39/volunteer-7788809_1280.jpg",
      "https://as1.ftcdn.net/v2/jpg/14/48/80/98/1000_F_1448809845_p0dhcZnqqWsL9MrwOtzglhIdA9btfy2n.jpg",
    ],
    categoryId: 1,
  },
  {
    id: "2",
    title: "Education for All",
    resume:
      "Expanding educational opportunities for children in rural Latin America.",
    description:
      "Education for All delivers school materials, teacher training, and technology access to children in rural Latin American communities. This project empowers future generations by ensuring they have the tools and opportunities needed to learn, grow, and transform their societies through education.",
    country: "Peru",
    goalAmount: 20000,
    currentAmount: 15000,
    imageUrls: [
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/j0z44gmji2zpaujaq1bq",
      "https://as2.ftcdn.net/v2/jpg/09/72/66/13/1000_F_972661357_Pa5f2uo1gy0bMdbWxeMsfXPh54Gp7o9f.jpg",
    ],
    categoryId: 2,
  },
  {
    id: "3",
    title: "Clean Water",
    resume:
      "Providing sustainable clean water systems to rural families in Latin America.",
    description:
      "Clean Water focuses on building wells and installing sustainable filtration systems in rural Latin American regions. This initiative brings health and dignity to communities where clean water was once a luxury. By ensuring access to safe water, families can thrive and reduce waterborne diseases.",
    country: "Honduras",
    goalAmount: 30000,
    currentAmount: 10000,
    imageUrls: [
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/frpivkmxtvxs4rola6zs",
      "https://as2.ftcdn.net/v2/jpg/07/16/05/71/1000_F_716057139_FUM5NhLKLYdC8PAzJO6Fy5jgmO0dJHdW.jpg",
    ],
    categoryId: 3,
  },
  {
    id: "4",
    title: "Building Smiles",
    resume:
      "Reconstructing homes and community spaces for families affected by disasters.",
    description:
      "Building Smiles helps families rebuild their lives after natural disasters across Latin America. The project constructs safe, sustainable homes and community centers, restoring hope, security, and stability to those who lost everything. Each rebuilt home represents a new beginning for a family.",
    country: "Mexico",
    goalAmount: 50000,
    currentAmount: 32000,
    imageUrls: [
      "https://cdn.pixabay.com/photo/2023/02/14/04/39/volunteer-7788809_1280.jpg",
      "https://as2.ftcdn.net/v2/jpg/09/83/84/89/1000_F_983848937_YQDpUZ5llDlr4IAvP8w5gD6WNzrwigi5.jpg",
    ],
    categoryId: 1,
  },
  {
    id: "5",
    title: "Digital Literacy",
    resume:
      "Empowering Latin American youth through access to technology and digital education.",
    description:
      "Digital Literacy equips young people and adults with digital skills to improve employability and inclusion in the modern world. Through workshops, equipment donations, and mentoring, this project helps communities bridge the digital divide and create pathways to economic opportunities.",
    country: "Colombia",
    goalAmount: 25000,
    currentAmount: 12000,
    imageUrls: [
      "https://as2.ftcdn.net/v2/jpg/17/14/93/71/1000_F_1714937110_9Jwmvpr0J2mVop0HoJaGDAUMmtrqChGm.jpg",
      "https://as2.ftcdn.net/v2/jpg/09/72/66/13/1000_F_972661357_Pa5f2uo1gy0bMdbWxeMsfXPh54Gp7o9f.jpg",
    ],
    categoryId: 2,
  },
  {
    id: "6",
    title: "Pure Waters",
    resume:
      "Building rainwater collection systems for drought-prone communities in Latin America.",
    description:
      "Pure Waters installs rainwater harvesting systems and wells in drought-prone areas of Latin America. These initiatives guarantee long-term access to clean water, empowering communities to face climate challenges with resilience and improving their health and quality of life sustainably.",
    country: "Chile",
    goalAmount: 35000,
    currentAmount: 15000,
    imageUrls: [
      "https://as1.ftcdn.net/v2/jpg/14/48/80/98/1000_F_1448809845_p0dhcZnqqWsL9MrwOtzglhIdA9btfy2n.jpg",
      "https://as2.ftcdn.net/v2/jpg/07/16/05/71/1000_F_716057139_FUM5NhLKLYdC8PAzJO6Fy5jgmO0dJHdW.jpg",
    ],
    categoryId: 3,
  },
];
