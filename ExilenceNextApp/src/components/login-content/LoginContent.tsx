import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Account } from '../../store/domains/account';
import AccountValidationForm, {
  AccountFormValues,
} from './account-validation-form/AccountValidationForm';
import useStyles from './LoginContent.styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { electronService } from '../../services/electron.service';
type LoginContentProps = {
  handleValidate: (form: AccountFormValues) => void;
  isSubmitting: boolean;
  isInitiating: boolean;
  account: Account;
  errorMessage?: string;
  authUrl?: string;
};

const LoginContent = ({
  handleValidate,
  isSubmitting,
  isInitiating,
  account,
  errorMessage,
  authUrl,
}: LoginContentProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.content}
      >
        <Grid item sm={9} md={5} lg={4} xl={3}>
          <Paper className={clsx('paper', classes.loginContentContainer)}>
            <Typography variant="h5" className={classes.loginTitle}>
              {t('title.login')}
            </Typography>
            {errorMessage && (
              <Box mb={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {t(errorMessage)}
                </Alert>
              </Box>
            )}
            <Box>
              <AccountValidationForm
                handleValidate={(form: AccountFormValues) => handleValidate(form)}
                styles={classes}
                isSubmitting={isSubmitting}
                isInitiating={isInitiating}
                account={account}
              />
            </Box>
            <Box mb={2} mt={2}>
              <Typography variant="subtitle2">{t('title.redirect_not_working')}</Typography>
              <Box className={classes.linkBox} p={1} mt={1} pr={4}>
                <Typography variant="caption">{authUrl}</Typography>
                <Tooltip title={t('label.copy_link') || ''} placement="bottom">
                  <IconButton
                    size="small"
                    className={classes.copyIcon}
                    onClick={() => electronService.clipboard.writeText(authUrl)}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default observer(LoginContent);
