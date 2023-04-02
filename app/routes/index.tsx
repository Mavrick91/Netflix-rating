export default function Index() {
  return (
    <div
      className="min-h-screen pt-20 px-4"
      style={{
        backgroundColor: "rgb(0, 2, 18)",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1
          className="text-[80px] -tracking-[0.02em] text-white font-['Nunito Sans'] w-[53rem]"
          style={{
            background:
              "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          The Ultimate Movie Rating Database and Review Site
        </h1>
      </div>
    </div>
  );
}
