import Link from 'next/link'
import { hrsCloud, hrsDatabase, hrsWorkflow, type HrsNode } from '@/data/hrs-case-study'
import { HrsNode as Node } from './HrsNode'
import styles from './HrsCaseStudy.module.css'

function Connector({ label, outcome }: { label?: string; outcome?: 'Yes' | 'No' }) {
  return <div className={`${styles.connector} ${outcome ? styles.decisionConnector : ''}`}>{outcome && <span className={styles.connectorLabel}><b className={styles.edgeBadge}>{outcome}</b><span>{label}</span></span>}<i aria-hidden="true" /></div>
}

function Decision({ node, exit, label }: { node: HrsNode; exit: HrsNode; label: string }) {
  return (
    <div className={styles.decision}>
      <Node node={node} />
      <div className={styles.branch}>
        <span className={styles.branchLabel}><b className={styles.edgeBadge}>{label}</b></span>
        <Node node={exit} />
      </div>
    </div>
  )
}

export function HrsCaseStudy() {
  return (
    <main className={`page-shell ${styles.page}`}>
      <header className={styles.hero}>
        <Link className={styles.back} href="/projects">← All projects</Link>
        <p className="eyebrow">HRS Publication Pipeline</p>
        <h1>From publication alerts<br />to a review-ready queue.</h1>
        <p className={styles.lead}>A publication workflow for the Health and Retirement Study. Follow an alert from the inbox to human review—and explore the engineering decisions along the way.</p>
        <div className={styles.meta}><span>Python</span><span>PostgreSQL</span><span>Google Cloud</span></div>
        <nav aria-label="Case study chapters" className={styles.chapters}>
          <a href="#hrs-problem"><span>01</span> The problem</a>
          <a href="#hrs-workflow"><span>02</span> Architecture + workflow</a>
          <a href="#hrs-deployment"><span>03</span> Deployment + trade-offs</a>
        </nav>
      </header>

      <section id="hrs-problem" className={styles.section} aria-labelledby="hrs-problem-heading">
        <p className="eyebrow">01 / The problem</p>
        <h2 id="hrs-problem-heading">Every alert starts another round of checks.</h2>
        <div className={styles.problemGrid}>
          <div><h3>The manual workflow</h3><p>At my research institute, publication alerts arrive from Google Scholar and Web of Science. Staff had to open those emails, copy out paper details, and check multiple criteria across different sources.</p><p>This took 30–60 minutes a day of repetitive work.</p></div>
          <div><h3>What I designed and built</h3><p>I designed and built a Python pipeline to automate much of that repetitive intake, checking, and preparation—turning publication alerts into a review-ready queue.</p><p>Staff keep the final decision, with the publication details and check results prepared for them.</p></div>
        </div>
        <div className={styles.outcome}><span>Design principle</span><p>Automate the repeatable checks.<br /><strong>Keep the evidence and the human decision.</strong></p></div>
      </section>

      <section id="hrs-workflow" className={styles.section} aria-labelledby="hrs-workflow-heading">
        <p className="eyebrow">02 / Architecture + workflow</p>
        <h2 id="hrs-workflow-heading">Follow one publication.</h2>
        <p className={styles.sectionIntro}>Read from top to bottom. Click any node to open its explanation.</p>
        <div className={styles.workflow}>
          <div className={styles.mainTrack}>
            <Node node={hrsWorkflow.gmail} /><Connector />
            <Node node={hrsWorkflow.source} /><Connector />
            <div className={styles.fork}>
              <div className={styles.forkBranch}><Node node={hrsWorkflow.scholar} /></div>
              <div className={styles.forkBranch}><Node node={hrsWorkflow.wos} /></div>
            </div>
            <div className={styles.merge} aria-hidden="true"><span /><span /></div>
            <Connector />
            <Node node={hrsWorkflow.storage} /><Connector />
          </div>
          <Decision node={hrsWorkflow.title} exit={hrsWorkflow.titleSkip} label="Yes" />
          <div className={styles.mainTrack}><Connector outcome="No" label="Look up publication" /></div>
          <Decision node={hrsWorkflow.pubmed} exit={hrsWorkflow.unmatched} label="No" />
          <div className={styles.mainTrack}><Connector outcome="Yes" label="Check PMID" /></div>
          <Decision node={hrsWorkflow.pmid} exit={hrsWorkflow.pmidSkip} label="Yes" />
          <div className={styles.mainTrack}>
            <Connector outcome="No" label="Prepare candidate" />
            <Node node={hrsWorkflow.authors} /><Connector />
            <div className={styles.aiStep}>
              <Node node={hrsWorkflow.ai} />
              <p>Implemented locally; optional and disabled by default. Staff review every suggestion.</p>
            </div>
            <Connector />
            <Node node={hrsWorkflow.review} />
          </div>
        </div>
      </section>

      <section id="hrs-deployment" className={styles.section} aria-labelledby="hrs-deployment-heading">
        <p className="eyebrow">03 / Cloud deployment + trade-offs</p>
        <h2 id="hrs-deployment-heading">Where it runs.<br />Where its state lives.</h2>
        <p className={styles.sectionIntro}>Execution and persistence needed separate decisions. Explore the reasoning and the components on each side.</p>
        <div className={styles.deploymentGrid}>
          <section className={styles.deploymentColumn} aria-labelledby="hrs-database-heading">
            <header><span className={styles.columnNumber}>A / Persistence</span><h3 id="hrs-database-heading">Database</h3><p>What must survive the next run.</p></header>
            {hrsDatabase.map((node) => <Node node={node} key={node.id} />)}
          </section>
          <section className={styles.deploymentColumn} aria-labelledby="hrs-cloud-heading">
            <header><span className={styles.columnNumber}>B / Execution + hosting</span><h3 id="hrs-cloud-heading">Google Cloud</h3><p>How the pipeline runs without a laptop.</p></header>
            {hrsCloud.map((node) => <Node node={node} key={node.id} />)}
          </section>
        </div>
        <p className={styles.statusNote}>Deployment record · October 24, 2026: cloud execution and scheduling were verified, then paused pending staff readiness. Newer local changes require a separate deployment.</p>
      </section>
      <div className={styles.end}><span>More of my work</span><Link href="/projects">Back to projects <span aria-hidden="true">↗</span></Link></div>
    </main>
  )
}
