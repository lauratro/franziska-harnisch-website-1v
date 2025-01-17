import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled, { css, keyframes } from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import {EventsFrontPage} from '../components/EventsFrontPage/EventsFrontPage';
import {PictureHometwo} from '../components/PictureHometwo/pictureHometwo';
import PictureHomeMob from '../components/PictureHomeMob/PictureHomeMob';
import PageContainer from '../components/PageContainer';
import SEO from '../components/SEO';
import {IAbout} from "../templates/about-page"

const useStyles = makeStyles((theme) => ({
  largeScreen: {
    display:"block",
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
  },
  mobScreen: {
display:"block",
    [theme.breakpoints.up(900)]: {
      display: 'none',
    },
  },
}));
export interface IHome{
  home:{
    image:string,
    title:string,
    description:string,
    event:IEv["event"],
      intro:IPic["intro"],
    location:IAbout["about"]["location"]
  }
}
export interface IEv{
  event:{
    comingTitle: string,
    futureEvent: string,
    lastTitle: string,
    lastEvent:string,
  },
}
export interface IPic{
intro:{
    blurbs:{
      image:string,
      text:string,
      link:string,
    }[]
}
}
export const HometwoTemplate:React.FC<IHome["home"]> = ({ image, title, event, intro, location }) => {
  console.log(intro.blurbs);
  const classes = useStyles();
  return (
    <PageContainer>
      <div
      /*  style={{
        position: 'relative',
        left: 300,
        display: 'flex',
        width: 'fit-content',
        lineHeight: '1',
        justifyContent: 'space-around',
        alignItems: 'left',
        flexDirection: 'column',
      }} */
      >
        <EventsFrontPage event={event} />
        <div className={classes.largeScreen}><PictureHometwo intro={intro} /></div>
        <div className={classes.mobScreen}><PictureHomeMob pic={intro.blurbs} /></div>
   
      </div>
    </PageContainer>
  );
};
const LauraTest: React.FC<any> = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const classes = useStyles();

  return (
    <Layout location={location}>
      <SEO
        title={frontmatter.title}
        location={location}
        description={frontmatter.description}
        image={frontmatter.image}
      />
      <HometwoTemplate
        location={location}
        description={frontmatter.description}
        image={frontmatter.image}
        title={frontmatter.title}
        event={frontmatter.event}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};
export default LauraTest;
/* HometwoTemplate.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  event: PropTypes.shape({
    comingTitle: PropTypes.string,
    futureEvent: PropTypes.string,
    lastTitle: PropTypes.string,
    lastEvent: PropTypes.string,
  }),
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}; */
export const pageQuery = graphql`
  query HometwoTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image
        description
        event {
          comingTitle
          futureEvent
          lastTitle
          lastEvent
        }
        intro {
          blurbs {
            image
            text
            link
          }
        }
      }
    }
  }
`;
