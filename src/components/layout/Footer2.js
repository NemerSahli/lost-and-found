import React from 'react';
import {
  Footer,
  FooterSection,
  FooterDropDownSection,
  FooterLinkList
} from 'react-mdl';
import { Link } from 'react-router-dom';

export default function Footer2() {
  return (
    <Footer size="mega">
      <FooterSection type="middle">
        <FooterDropDownSection title="Features">
          <FooterLinkList>
            <h5>Address:</h5>

            <strong>DCI Digital Career Institute, Berlin</strong>
            <span>Vulkanstraße 1, 10367 Berlin</span>
            <p>030 364286190</p>
            <p>info@devugees.org</p>
          </FooterLinkList>
        </FooterDropDownSection>
        <FooterDropDownSection title="Details">
          <FooterLinkList>
            <Link to="/mainpage">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/">Gallery</Link>
          </FooterLinkList>
        </FooterDropDownSection>
        <FooterDropDownSection title="Technology">
          <FooterLinkList>
            <a href="#">How it works</a>
            <a href="#">Patterns</a>
            <a href="#">Usage</a>
            <a href="#">Products</a>
          </FooterLinkList>
        </FooterDropDownSection>
      </FooterSection>
      <FooterSection type="bottom" logo="Fuburo">
        <FooterLinkList>
          <a href="#">Help</a>
          <a href="#">Privacy & Terms</a>
        </FooterLinkList>
      </FooterSection>
    </Footer>
  );
}
