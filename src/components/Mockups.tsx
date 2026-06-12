import styles from '@/app/page.module.css';

export function CopilotMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.mockupHeader}>
        <span className={styles.mockupTitle}>Readiness report</span>
        <span className={styles.mockupTag}>Live</span>
      </div>
      <div className={styles.scoreRow}>
        <div className={styles.scoreRing}>
          <div className={styles.scoreInner}>
            <span className={styles.scoreValue}>87%</span>
            <span className={styles.scoreCaption}>Pass probability</span>
          </div>
        </div>
        <div className={styles.scoreMeta}>
          <div className={styles.metaItem}>
            <div className={styles.metaTop}>
              <span className={styles.metaLabel}>Mathematics</span>
              <span className={styles.metaValue}>92</span>
            </div>
            <div className={styles.metaBar}><div className={styles.metaFill} style={{ width: '92%' }}></div></div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaTop}>
              <span className={styles.metaLabel}>English Language</span>
              <span className={styles.metaValue}>84</span>
            </div>
            <div className={styles.metaBar}><div className={styles.metaFill} style={{ width: '84%' }}></div></div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaTop}>
              <span className={styles.metaLabel}>Physics</span>
              <span className={styles.metaValue}>61</span>
            </div>
            <div className={styles.metaBar}><div className={`${styles.metaFill} ${styles.metaFillWarn}`} style={{ width: '61%' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PathwaysMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.mockupHeader}>
        <span className={styles.mockupTitle}>Study pathway</span>
        <span className={styles.mockupTag}>Calibrated</span>
      </div>
      <div className={styles.pathList}>
        <div className={`${styles.pathItem} ${styles.pathDone}`}>
          <span className={styles.pathIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span className={styles.pathName}>Quadratic equations</span>
          <span className={styles.pathStatus}>Mastered</span>
        </div>
        <div className={`${styles.pathItem} ${styles.pathDone}`}>
          <span className={styles.pathIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span className={styles.pathName}>Circle geometry</span>
          <span className={styles.pathStatus}>Mastered</span>
        </div>
        <div className={`${styles.pathItem} ${styles.pathFocus}`}>
          <span className={styles.pathIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </span>
          <span className={styles.pathName}>Probability &amp; statistics</span>
          <span className={styles.pathStatus}>Focus next</span>
        </div>
        <div className={styles.pathItem}>
          <span className={styles.pathIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </span>
          <span className={styles.pathName}>Vectors &amp; transformations</span>
          <span className={styles.pathStatus}>Queued</span>
        </div>
      </div>
    </div>
  );
}

export function RadarMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.mockupHeader}>
        <span className={styles.mockupTitle}>Cohort readiness</span>
        <span className={styles.mockupTag}>Live</span>
      </div>
      <div className={styles.cohortBars}>
        <div className={styles.cohortBar} style={{ height: '72%' }}></div>
        <div className={styles.cohortBar} style={{ height: '88%' }}></div>
        <div className={`${styles.cohortBar} ${styles.cohortBarWarn}`} style={{ height: '46%' }}></div>
        <div className={styles.cohortBar} style={{ height: '80%' }}></div>
        <div className={styles.cohortBar} style={{ height: '94%' }}></div>
        <div className={`${styles.cohortBar} ${styles.cohortBarRisk}`} style={{ height: '32%' }}></div>
        <div className={styles.cohortBar} style={{ height: '66%' }}></div>
        <div className={styles.cohortBar} style={{ height: '84%' }}></div>
      </div>
      <div className={styles.cohortLegend}>
        <span className={styles.legendItem}><span className={styles.legendSwatch}></span>On track</span>
        <span className={styles.legendItem}><span className={`${styles.legendSwatch} ${styles.legendSwatchWarn}`}></span>Watch</span>
        <span className={styles.legendItem}><span className={`${styles.legendSwatch} ${styles.legendSwatchRisk}`}></span>At risk</span>
      </div>
    </div>
  );
}

export function ForesightMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.mockupHeader}>
        <span className={styles.mockupTitle}>National pass rate</span>
        <span className={styles.mockupTag}>Projected</span>
      </div>
      <svg className={styles.foresightChart} viewBox="0 0 300 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="0" y1="35" x2="300" y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="0" y1="70" x2="300" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="0" y1="105" x2="300" y2="105" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="0" y1="139" x2="300" y2="139" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <path d="M0 112 C 30 108, 55 102, 85 92 S 140 72, 168 62" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        <path d="M168 62 C 200 50, 245 38, 296 24" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 6" />
        <circle cx="168" cy="62" r="4" fill="#0A0A0C" stroke="#34D399" strokeWidth="2" />
      </svg>
      <div className={styles.foresightFooter}>
        <span className={styles.foresightAxis}>2018 — Today</span>
        <span className={styles.foresightAxis}>Today — 2032</span>
      </div>
    </div>
  );
}

export function ApiMockup() {
  return (
    <div className={styles.mockupCard}>
      <div className={styles.mockupHeader}>
        <span className={styles.mockupTitle}>POST /v1/predictions</span>
        <span className={styles.mockupTag}>200 OK</span>
      </div>
      <pre className={styles.apiCode}>
        <code>
          <span className={styles.codePunct}>{'{'}</span>{'\n'}
          {'  '}<span className={styles.codeKey}>&quot;student_id&quot;</span><span className={styles.codePunct}>: </span><span className={styles.codeString}>&quot;stu_8h2k4&quot;</span><span className={styles.codePunct}>,</span>{'\n'}
          {'  '}<span className={styles.codeKey}>&quot;exam&quot;</span><span className={styles.codePunct}>: </span><span className={styles.codeString}>&quot;WAEC&quot;</span><span className={styles.codePunct}>,</span>{'\n'}
          {'  '}<span className={styles.codeKey}>&quot;pass_probability&quot;</span><span className={styles.codePunct}>: </span><span className={styles.codeValue}>0.87</span><span className={styles.codePunct}>,</span>{'\n'}
          {'  '}<span className={styles.codeKey}>&quot;mastery_index&quot;</span><span className={styles.codePunct}>: </span><span className={styles.codeValue}>74.2</span><span className={styles.codePunct}>,</span>{'\n'}
          {'  '}<span className={styles.codeKey}>&quot;focus_topics&quot;</span><span className={styles.codePunct}>: [</span><span className={styles.codeString}>&quot;probability&quot;</span><span className={styles.codePunct}>, </span><span className={styles.codeString}>&quot;vectors&quot;</span><span className={styles.codePunct}>]</span>{'\n'}
          <span className={styles.codePunct}>{'}'}</span>
        </code>
      </pre>
    </div>
  );
}
