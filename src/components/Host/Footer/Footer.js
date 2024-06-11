import React from 'react';
import styles from './Footer.module.css';
import Grid from '@material-ui/core/Grid';

export default function Footer(props) {
  return (
    <Grid
      item
      container
      alignItems="center"
      xs={12}
      style={{ minHeight: "10vh" }}
      className={ styles.footer }
    >
      <div>Game PIN: <strong>{ props.pin }</strong></div>
    </Grid>
  )
}
