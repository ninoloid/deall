export class DateUtil {
  public static SECONDS_IN_ONE_HOUR = 3600;
  public static HOURS_IN_ONE_DAY = 24;

  public static DateToUnixSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  public static UnixSecondsToDate(value: number): Date {
    return new Date(value * 1000);
  }
}
