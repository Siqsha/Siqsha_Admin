const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative h-[50px] w-[50px]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="dot w-[10px] h-[10px] rounded-full bg-primary absolute"
            style={{
              opacity: 1 - i * 0.1,
              transform: `rotate(${360 - i * 36}deg) translate(20px)`,
              animationDelay: `${-i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
