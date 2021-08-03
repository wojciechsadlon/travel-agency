import React from "react";
import PropTypes from "prop-types";
import Section from "../../layout/Section/Section";
import CountrySummary from "../../features/CountrySummary/CountrySummary";
import PageTitle from "../../common/PageTitle/PageTitle";
import { Grid, Row } from "react-flexbox-grid";
import { NavLink } from "react-router-dom";

const Countries = ({ countries }) => (
  <Section>
    <Grid>
      <PageTitle text="All countries" />
      {Object.keys(countries).map((code) => (
        <NavLink to={`/` + { code }}>
          <Row between="md">
            <CountrySummary key={code} {...countries[code]} />
          </Row>
        </NavLink>
      ))}
    </Grid>
  </Section>
);

Countries.propTypes = {
  countries: PropTypes.objectOf(PropTypes.object),
};

export default Countries;
