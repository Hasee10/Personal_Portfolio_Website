import { ImageResponse } from 'next/og'

/* Social-preview card — what LinkedIn/Twitter/Slack render when the site is
 * shared. Generated at build time by Next (no runtime cost, no new deps).
 * Mirrors the hero: mono type, Forest Moss palette, node-graph mark.
 */

export const runtime = 'edge'
export const alt = 'Haseeb Arshad — Agentic AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#090B08',
          fontFamily: 'monospace',
        }}
      >
        {/* Ambient moss glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(78,107,69,0.28) 0%, rgba(78,107,69,0.08) 50%, transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 96px',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#8A9A7E',
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            — AI / LLM ENGINEER
          </div>
          <div
            style={{
              display: 'flex',
              color: '#F4E8D0',
              fontSize: 84,
              fontWeight: 700,
              marginTop: 18,
              letterSpacing: -2,
            }}
          >
            Haseeb Arshad
          </div>
          <div
            style={{
              display: 'flex',
              color: '#9DBE8D',
              fontSize: 36,
              marginTop: 26,
            }}
          >
            $ I build AI systems that ship._
          </div>
          <div
            style={{
              display: 'flex',
              color: '#5C6B50',
              fontSize: 22,
              marginTop: 44,
              letterSpacing: 2,
            }}
          >
            voice agents · RAG systems · multi-agent orchestration
          </div>
        </div>

        {/* Minimal node-graph mark, echoing the hero */}
        <svg
          width="340"
          height="630"
          viewBox="0 0 340 630"
          style={{ marginRight: 40 }}
        >
          <line x1="170" y1="315" x2="90"  y2="180" stroke="#4E6B45" strokeWidth="2" />
          <line x1="170" y1="315" x2="260" y2="200" stroke="#4E6B45" strokeWidth="2" />
          <line x1="170" y1="315" x2="70"  y2="400" stroke="#4E6B45" strokeWidth="2" />
          <line x1="170" y1="315" x2="255" y2="440" stroke="#4E6B45" strokeWidth="2" />
          <line x1="90"  y1="180" x2="260" y2="200" stroke="#263321" strokeWidth="1.5" />
          <line x1="70"  y1="400" x2="255" y2="440" stroke="#263321" strokeWidth="1.5" />
          <circle cx="90"  cy="180" r="14" fill="#161D14" stroke="#263321" strokeWidth="2" />
          <circle cx="260" cy="200" r="14" fill="#161D14" stroke="#263321" strokeWidth="2" />
          <circle cx="70"  cy="400" r="14" fill="#161D14" stroke="#263321" strokeWidth="2" />
          <circle cx="255" cy="440" r="14" fill="#161D14" stroke="#263321" strokeWidth="2" />
          <circle cx="170" cy="315" r="26" fill="rgba(157,190,141,0.15)" stroke="#9DBE8D" strokeWidth="2.5" />
          <circle cx="170" cy="315" r="44" fill="none" stroke="rgba(157,190,141,0.3)" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    size
  )
}
