// NPM
import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

// COMPONENTS
import Carousel from "../../../shared_components/Carousel";
import TripCart from "../../../shared_components/Carts/Trip";

// ACTIONS/CONFIG

// STYLES
import {
  PageWrapper,
  SectionWrap,
  SectionHeader,
  SectionContent,
  More
} from "../../../shared_components/layout/Page";

// MODULE
export default function HomeSectionTrips({ trips }) {
  return (
    <PageWrapper>
      <SectionWrap>
        <SectionHeader>
          <h3>Amazing Trips</h3>
          <More>
            <Link to="/trips">All trips</Link>
          </More>
        </SectionHeader>
        <SectionContent>
          <Carousel shadowInside withLoader>
            {trips.map(item => (
              <TripCart
                item={item}
                withShadow
                key={item.title}
                xsBasis="50%"
                mdBasis="25%"
              />
            ))}
          </Carousel>
        </SectionContent>
      </SectionWrap>
    </PageWrapper>
  );
}

// Props Validation
HomeSectionTrips.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object)
};