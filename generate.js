const fs = require("fs");
const path = require("path");

const dir_whitelist = [
  "SE_ZC410_MARKETING",
  "SE_ZC420_DATA_VISUALIZATION_Data_Visualization_and_Communication",
  "SE_ZC425_DATA_MINING",
  "SE_ZC444_ARTIFICIAL_INTELLIGENCE",
  "SE_ZG501_SOFTWARE_QUALITY_ASSURANCE_AND_TESTING",
  "SE_ZG503_FULL-STACK_APPLICATION_DEVELOPMENT",
  "SE_ZG504_API-BASED_PRODUCTS",
  "SE_ZG505_USER_EXPERIENCE_DESIGN",
  "SE_ZG507_PRODUCT_DISCOVERY_AND_REQUIREMENTS_ENGINEERING",
  "SE_ZG508_PRODUCT_STRATEGY_AND_PLANNING",
  "SE_ZG509_Communication,_Estimation_and_Negotiation",
  "SE_ZG510_PRODUCT_ANALYTICS",
  "SE_ZG512_OBJ_ORI_ANALYSIS_DESIGN",
  "SE_ZG514_INTRODUCTION_TO_DEVOPS",
  "SE_ZG515_DATA_WAREHOUSING",
  "SE_ZG516_EMBEDDED_SYSTEM_DESIGN",
  "SE_ZG518_DATABASE_DESIGN_APPLICATIONS",
  "SE_ZG519_DATA_STRUCTURES_ALGO_DESIGN",
  "SE_ZG522_BIG_DATA_SYSTEMS",
  "SE_ZG527_CLOUD_COMPUTING",
  "SE_ZG528_CYBER_PHYSICAL_SYSTEMS",
  "SE_ZG530_DESIGN_OF_CONVERSATIONAL_EXPERIENCES",
  "SE_ZG533_SERVICE_ORIENTED_COMPUTING",
  "SE_ZG544_AGILE_SOFTWARE_PROCESSES",
  "SE_ZG552_SOFTWARE_TESTING_METHODOLOGIES",
  "SE_ZG555_DATA_VISUALIZATION_AND_INTERPRETATION",
  "SE_ZG557_ARTIFICIAL_AND_COMPUTATIONAL_INTELLIGENCE",
  "SE_ZG566_SECURE_SOFTWARE_ENGINEERING",
  "SE_ZG568_APPLIED_MACHINE_LEARNING",
  "SE_ZG569_BLOCKCHAIN_TECHNOLOGIES_SYS",
  "SE_ZG583_SCALABLE_SERVICES",
  "SE_ZG585_CROSS_PLATFORM_APP_DEVELOPMENT",
  "SE_ZG586_EDGE_COMPUTING",
  "SE_ZG587_OPEN_SOURCE_SOFTWARE_ENGG",
  "SE_ZG589_MIDDLEWARE_TECHNOLOGIES",
  "SE_ZG622_SOFTWARE_PROJECT_MANAGEMENT",
  "SE_ZG626_HARDWARE_SOFTWARE_CO_DESIGN",
  "SE_ZG651_SOFTWARE_ARCHITECTURES",
  "SE_ZG661_SOFTWARE_QUALITY_MANAGEMENT",
  "SE_ZG681_CYBER_SECURITY",
  "SE_ZG685_SOFTWARE_PRODUCT_MANAGEMENT",
];

function generateJson(dir) {
  const output = {};
  let items = dir_whitelist;
  if (dir) {
    items = fs.readdirSync(dir);
  } else {
    dir = ".";
  }

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory() || item.endsWith(".pdf")) {
      if (stat.isDirectory()) {
        output[item] = generateJson(itemPath);
      } else {
        const relativePath = path.relative(".", itemPath);
        output[item] = relativePath;
      }
    }
  });

  return output;
}

const jsonOutput = generateJson();
fs.writeFileSync("files.json", JSON.stringify(jsonOutput));

console.log("files.json has been generated!");
