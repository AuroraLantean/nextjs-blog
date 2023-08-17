import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/AuroraClassWarship776.png"
          alt="An image showing AuroraClassWarship776"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm a Web3 Rust/Solidity and NextJs dev!</h1>
      <p>I blog about web development...</p>
    </section>
  );
}

export default Hero;
