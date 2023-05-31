import {useEffect, useState} from 'react';
import cmfChileDB from '../api/cmfChileDB';
import {Indicator, IndicatorDB} from '../interfaces/indicatorInterface';

interface Props {
  indicator: string;
  daysBefore: number;
  monthBefore?: number;
}

export const useIndicators = ({indicator, daysBefore, monthBefore}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [indicators, setIndicators] = useState<Indicator[]>();
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    switch (indicator) {
      case 'ipc':
      case 'utm':
        const dateFin1 = new Date();
        const yearFin1 = dateFin1.getFullYear();
        const monthFin1 = dateFin1.getMonth() + 1;

        if (monthBefore !== undefined) {
          dateFin1.setMonth(monthFin1 - monthBefore);

          const yearIni1 = dateFin1.getFullYear();
          const monthIni1 = dateFin1.getMonth();

          setUrl(
            `/${indicator}/periodo/${yearIni1}/${monthIni1}/${yearFin1}/${monthFin1}`,
          );
          return;
        }

        setUrl(`/${indicator}/${yearFin1}`);
        return;

      case 'dolar':
      case 'euro':
      case 'uf':
        const dateFin = new Date();
        const yearFin = dateFin.getFullYear();
        const monthFin = dateFin.getMonth() + 1;
        const dayFin = dateFin.getDate();

        dateFin.setDate(dayFin - daysBefore);

        const yearIni = dateFin.getFullYear();
        const monthIni = dateFin.getMonth() + 1;
        const dayIni = dateFin.getDate();

        setUrl(
          `/${indicator}/periodo/${yearIni}/${monthIni}/dias_i/${dayIni}/${yearFin}/${monthFin}/dias_f/${dayFin}`,
        );
        return;

      default:
        setUrl(`/${indicator}`);
        return;
    }
  }, [indicator, monthBefore, daysBefore]);

  useEffect(() => {
    const getIndicators = async () => {
      const resp = await cmfChileDB.get<IndicatorDB>(url);

      switch (indicator) {
        case 'euro':
          setIndicators(resp.data.Euros.reverse());
          setIsLoading(false);
          return;
        case 'dolar':
          setIndicators(resp.data.Dolares.reverse());
          setIsLoading(false);
          return;
        case 'ipc':
          setIndicators(resp.data.IPCs.reverse());
          setIsLoading(false);
          return;
        case 'utm':
          setIndicators(resp.data.UTMs.reverse());
          setIsLoading(false);
          return;
        case 'uf':
          setIndicators(resp.data.UFs.reverse());
          setIsLoading(false);
          return;
        default:
          setIndicators([]);
          setIsLoading(false);
          return;
      }
    };
    getIndicators();
  }, [url, indicator]);

  return {indicators, isLoading};
};
