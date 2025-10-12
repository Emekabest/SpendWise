export default ({ config }) => ({
  ...config,
  expo: {
    "name": "SpendWise",
    "slug": "SpendWise",
    android: {
      package: "com.jojo104.spendwise", // 👈 change this to your preferred unique ID
    },  
  extra: {
    ...config.expo?.extra, // Preserve existing properties
    API_URL: process.env.API_URL,
    eas: {
        projectId: "23723df3-76a2-4333-b942-bbd2003e47b5", // Ensure projectId is included
    },
  },
}
});