import React from 'react';
import {
  Footer,
  FooterSection,
  FooterDropDownSection,
  FooterLinkList
} from 'react-mdl';

export default function Footer2() {
  return (
    <Footer size="mega">
      <FooterSection type="middle">
        <FooterDropDownSection title="Features">
          <FooterLinkList>
            <h5>Address:</h5>
            <p>
              <strong>DCI Digital Career Institute, Berlin</strong>
            </p>
            <p>Vulkanstraße 1, 10367 Berlin</p>
            <p>030 364286190</p>
            <p>info@devugees.org</p>
          </FooterLinkList>
        </FooterDropDownSection>
        <FooterDropDownSection title="Details">
          <FooterLinkList>
            <a href="#">Specs</a>
            <a href="#">Tools</a>
            <a href="#">Resources</a>
          </FooterLinkList>
        </FooterDropDownSection>
        <FooterDropDownSection title="Technology">
          <FooterLinkList>
            <a href="#">How it works</a>
            <a href="#">Patterns</a>
            <a href="#">Usage</a>
            <a href="#">Products</a>
            <a href="#">Contracts</a>
          </FooterLinkList>
        </FooterDropDownSection>
        <FooterDropDownSection title="FAQ">
          <FooterLinkList>
            <a href="#">Questions</a>
            <a href="#">Answers</a>
            <a href="#">Contact Us</a>
          </FooterLinkList>
        </FooterDropDownSection>
      </FooterSection>
      <FooterSection type="bottom" logo="Title">
        <FooterLinkList>
          <a href="#">Help</a>
          <a href="#">Privacy & Terms</a>
        </FooterLinkList>
      </FooterSection>
    </Footer>
  );
}
