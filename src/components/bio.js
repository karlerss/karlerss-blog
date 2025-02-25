/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/karl-profile.jfif"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
          <div>
              <p>
                  Written by <strong>{author.name}</strong> {author?.summary || null}
                  {` `} Co-founder at <a href={'https://www.teamdash.com/'} target={'_blank'}>Teamdash</a>.
                  Drop me a line on <a href={'https://www.linkedin.com/in/karl-sander-erss/'} target={'_blank'}>linkedin</a>. 
                  Check out my <a href={'https://utm.zone/'} target={'_blank'}>Bulk UTM link builder</a>, <a href={'https://raamatud.karlerss.com/'} target={'_blank'}>reading journal</a>, <a href={'https://dokumendiregistrid.karlerss.com/'} target={'_blank'}>full text search from government documents</a>.
              </p>
          </div>
      )}
    </div>
  )
}

export default Bio
