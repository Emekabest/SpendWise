export default ({ config }) => ({
  ...config,
  expo: {
    "name": "SpendWise",
    "slug": "SpendWise",
    ...config.expo,
  extra: {
    ...config.expo?.extra, // Preserve existing properties
    API_URL: process.env.API_URL,
    eas: {
        projectId: "23723df3-76a2-4333-b942-bbd2003e47b5", // Ensure projectId is included
    },
  },
}
});