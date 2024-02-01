import core from "@actions/core";
/**
 *  Important configs for declaring organization and S3 settings
 */

console.log("Environment:", process.env.STAGE);

/**
 * START CHANGES:
 * */
const deploymentConfigs = {
  org: "wbez",
  s3Key: "astro-test",
  brightspotClientSecret: import.meta.env.VITE_BRIGHTSPOT_CLIENT_SECRET,
  brightspotClientId: import.meta.env.VITE_BRIGHTSPOT_CLIENT_ID,
};

/* ************
 * END CHANGES
 ************ */

// automatically set the bucket + env:
deploymentConfigs.env = process.env.STAGE;
if (deploymentConfigs.org === "wbez") {
  deploymentConfigs.s3Bucket =
    deploymentConfigs.env === "stage"
      ? "interactive-stage.wbez.org"
      : "interactive.wbez.org";
} else if (deploymentConfigs.org === "suntimes") {
  deploymentConfigs.s3Bucket =
    deploymentConfigs.env === "stage"
      ? "suntimes-graphics-staging"
      : "suntimes-graphics";
}

export default deploymentConfigs;

/**
 * *************************
 *  Github Actions Setup Variables
 *  Do NOT edit below this
 * *************************
 */

let cloudfrontDistribution;

if (deploymentConfigs.org === "wbez") {
  cloudfrontDistribution =
    deploymentConfigs.env === "stage" ? "E1I1KH6DZNIJ4R" : "EP4XPV202UY45";
} else if (deploymentConfigs.org === "suntimes") {
  cloudfrontDistribution =
    deploymentConfigs.env === "stage" ? "E1BG46YKPZC63O" : "E3SZIIBRJVISX1";
}

try {
  core.notice("Setting Env Values");
  core.exportVariable("ORGANIZATION", deploymentConfigs.org);
  core.exportVariable("S3_BUCKET", deploymentConfigs.s3Bucket);
  core.exportVariable("S3_KEY", deploymentConfigs.s3Key);
  core.exportVariable("DISTRIBUTION", cloudfrontDistribution);
  core.exportVariable("BRIGHTSPOT_CLIENT_ID", deploymentConfigs.brightspotClientId);
  core.exportVariable("BRIGHTSPOT_CLIENT_SECRET", deploymentConfigs.brightspotClientSecret);
} catch (err) {
  // setFailed logs the message and sets a failing exit code
  core.setFailed(`Action failed with error ${err}`);
}
