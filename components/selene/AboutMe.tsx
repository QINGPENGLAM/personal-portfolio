import Image from 'next/image'
import { withBasePath } from '@/lib/site'
import styles from './AboutMe.module.css'

const talkingPoints = [
  {
    title: 'Small improvements add up.',
    text: 'Working out has taught me to stay consistent and enjoy the process. I bring that same mindset to learning and engineering.',
  },
  {
    title: 'Learn it. Build it. Verify it.',
    text: 'I read research papers, explore ideas through weekly demos, and recently have been experimenting with RAG. AI helps me move faster, but I verify what it produces.',
  },
  {
    title: 'Start with the problem.',
    text: 'At USAA, I worked with backend systems, internal engineering tools, and AI-assisted workflows. That experience taught me to understand the problem before choosing the technology.',
  },
  {
    title: 'Build with people in mind.',
    text: 'I want to build software that makes complex tasks easier. I care about understanding what people need, designing a clear experience, and earning their trust through reliable systems.',
  },
]

export function AboutMe() {
  return (
    <section aria-labelledby="about-me-title" className={styles.section} id="about-me">
      <div className={styles.layout}>
        <figure className={styles.portrait}>
          <div className={styles.imageFrame}>
            <Image
              alt="Qingpeng Lam wearing a navy suit and burgundy tie"
              className={styles.image}
              height={1205}
              loading="lazy"
              sizes="(max-width: 850px) 88vw, 38vw"
              src={withBasePath('/images/qingpeng-portrait.jpg')}
              width={1306}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>Qingpeng Lam</span>
            <span>Curiosity. Consistency. Growth.</span>
          </figcaption>
        </figure>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>A little about me</p>
          <h2 id="about-me-title">Hi, I’m Qingpeng.</h2>
          <p className={styles.education}>Computer Science senior at the University of Michigan<br className={styles.desktopBreak} /> with a minor in UX Design.</p>
          <p className={styles.intro}>Curious by nature. Always looking for a better way to learn, build, and help people.</p>
          <div className={styles.points}>
            {talkingPoints.map((point, index) => (
              <div className={styles.point} key={point.title}>
                <span aria-hidden="true" className={styles.number}>0{index + 1}</span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
          <a className={styles.projectLink} href="#project-deck">A project I’m proud of <span aria-hidden="true">↘</span></a>
        </div>
      </div>
    </section>
  )
}
