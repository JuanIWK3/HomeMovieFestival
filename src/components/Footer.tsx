import React from 'react';
import '../style/footer.scss';
import { Card, Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer>
      <Card style={{ width: '100%', padding: '16px' }}>
        <div className="d-flex justify-content-around">
          <div>
            <h5 className="text-uppercase">Juan Israel</h5>
            <ul className="list-unstyled">
              <li>
                <a target="blank" href="https://github.com/JuanIWK3">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/juan-israel-b83a29207/"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-uppercase">Lucas Campos</h5>
            <ul className="list-unstyled">
              <li>
                <a target="blank" href="https://github.com/LucasDotCampos">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/lucas-rodrigues-5771b5227/"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </footer>
  );
};
