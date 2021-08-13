import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '../components/PageContainer';

const useStyles = makeStyles((theme) => ({
  linkWidth: {
    width: '30%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  noDec: {
    textDecoration: 'none',
    color: blueGrey[700],
  },
  '@media only screen and (max-width: 600px)': {
    marginPic: {
      marginLeft: theme.spacing(1),
    },
    linkWidth: {
      width: '50%',
    },
  },
  linkButton: {
    background: 'white',
    textTransform: 'uppercase',
    border: 'none',
    padding: 5,
  },
}));

export const LinksPageTemplate = ({ titleWebsite, links, location }) => {
  console.log('location', location);
  const classes = useStyles();

  return (
    <PageContainer title={titleWebsite}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 70,
        }}
      >
        <Typography variant="h3">{titleWebsite}</Typography>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {links.map((l) => {
            return (
              <div key={l.text} className={classes.linkWidth}>
                <button className={classes.linkButton}>
                  <a target="_blank" href={l.url} className={classes.noDec}>
                    {l.text.length > 30 ? (
                      <p>{l.text.slice(0, 30)}. . .</p>
                    ) : (
                      <p>{l.text}</p>
                    )}
                  </a>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};

LinksPageTemplate.propTypes = {
  title: PropTypes.string,
  titleWebsite: PropTypes.string,
  links: PropTypes.array,
};

const LinksPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout location={location}>
      <LinksPageTemplate
        location={location}
        titleWebsite={frontmatter.titleWebsite}
        links={frontmatter.links}
      />
    </Layout>
  );
};

LinksPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LinksPage;

export const linksPageQuery = graphql`
  query LinksPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        titleWebsite
        links {
          url
          text
        }
      }
    }
  }
`;
