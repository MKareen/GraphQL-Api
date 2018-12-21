import { CronJob } from 'cron';
import { BlacklistService } from '../services';
import { CRON_TIME, CRON_TIMEZONE } from '../configs/constants';
import Utils from '../helpers/utils';

export default new CronJob({
    cronTime: CRON_TIME,
    onTick: async () => {
        console.info('Start cron job');
        try {
            let tokens = await BlacklistService.getAll();

            if (tokens && tokens.length) {
                tokens.forEach(async (token) => {
                    try {
                        await Utils.verifyJWTToken(token.token);
                    } catch (e) {
                        // todo check error type then remove
                        await BlacklistService.remove(token._id);
                    }
                });
            }
        } catch(e) {
            console.log(e);
        }
        console.info('End cron job');
    },
    timeZone: CRON_TIMEZONE,
    start: false,
});
