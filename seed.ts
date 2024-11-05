import prisma from "./app/libs/prismadb";
async function main() {
  // Add a user for the article's author relationship
  const user = await prisma.user.create({
    data: {
      name: "Oluwatuyi",
      email: "soluwatist@gmail.com",
    },
  });
  const articles = [
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561715/thyroid_and_gene_c6fnbx.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Genetics",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("October 22, 2024"),
      minutesRead: 7,
      content: "This article explains how to use Prisma ORM in your projects.",
      references: ["https://prisma.io/docs", "https://mongodb.com"],
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562244/660542e521b837614d54af58_Untitled-1_vkdik8.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Reproduction",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("October 18, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561707/Temprature_thermometer_ixtwnx.jpg",
      category: "Miscellanous",
      title: "The Importance of Temperature In Health",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("October 18, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562204/AdrenalHormone_ozl6gs.jpg",
      category: "Adrenal Function",
      title: "Adrenal Function and Skin",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("October 8, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562148/thyroid_and_gut_euotkf.webp",
      category: "Thyroid Function",
      title: "Thyroid Function and Gut",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 6,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562687/Electolyte_qtnas8.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Kidneys and Electrolytes",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 6,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562346/Thyroid_Function_and_Liver_qlc0ug.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Liver",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562671/Thyroid_function_and_Skin_qef3ni.jpg",
      category: "Thyroid function",
      title: "Thyroid function and Skin",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562637/Thyroid_Function_and_Pregnancy_vb2hka.jpg",
      category: "Thyroid function",
      title: "Thyroid Function and Pregnancy",
      author: "Dr. Elizabeth Bright, , DO, ND, MICOh",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 8,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562346/Thyroid_Function_and_Liver_qlc0ug.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and the Lungs",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562445/Thyroid_Function_and_Trauma_n8vpm2.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Trauma",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 6,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562048/65f172d7f5ba78cec8a5e6ed_Thyroid_Illustration__6_smaller_kmvjvb.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function_ A Short Explanation",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 23, 2024"),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562509/TSH_test_vpltqq.png",
      category: "Thyroid Function",
      title: "TSH is not a reliable marker to measure Thyroid Function",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date("September 21, 2024"),
      minutesRead: 9,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561729/lugolsiodine_qgkikj.jpg",
      category: "Miscellaneous",
      title: "Why supplementing with Lugol's Iodine is Essential",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 15,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562133/Adrenal_Function_and_Asthma_le9rgn.jpg",
      category: "Steroid hormones",
      title: "What is Menopause",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 8,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561732/Progesterone_Natural_szwtdc.png",
      category: "Steroid hormones",
      title: "Is Bio-Identical Progesterone Natural",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 8,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561753/joggingtraining_ydmozd.jpg",
      category: "Adrenal Function",
      title: "Adrenal Function and Overtraining",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 4,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562276/Adrenal_Function_and_Cannabis_for_Pain_kqzrtc.jpg",
      category: "Adrenal Function",
      title: "Adrenal Function and Cannabis for Pain",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562222/Thyroid_Function_and_Brain_kbjf0k.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Brain",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 7,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562253/Thyroid_Function_and_Blood_vxusyy.jpg",
      category: "Thyroid Function",
      title: "Thyroid Function and Blood",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 10,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730562239/Thyroid_and_Skeletal_Health_lm5dqe.jpg",
      category: "Thyroid Function",
      title: "Thyroid and Skeletal Health",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 6,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561685/Adrenal_Function_and_Asthma_uxm09n.jpg",
      category: "Adrenal Function",
      title: "Adrenal Function and Asthma",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 4,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
    {
      picture:
        "https://res.cloudinary.com/drczkfgqp/image/upload/v1730561693/Tea_and_Fluorosis_kxsjuu.jpg",
      category: "Miscellaneous",
      title: "Tea and Fluorosis",
      author: "Dr. Elizabeth Bright, , DO, ND, MICO",
      datePublished: new Date(),
      minutesRead: 5,
      content:
        "Quantum computing is the next frontier in computing technology...",
      references: ["https://example.com/quantum", "https://science.com"],
      // Assuming the same user
    },
  ];
  for (const article of articles) {
    await prisma.article.create({
      data: article,
    });
  }

  console.log("Database has been seeded with articles");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
