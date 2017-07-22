import {HttpService} from "../http-service";

export interface IFundamentalData {
    open: number;
    high: number;
    low: number;
    volume: number;
    average_volume: number;
    high_52_weeks: number;
    low_52_weeks: number;
    market_cap: number;
    dividend_yield: number;
    pe_ratio: number|null;
    description: string;
    instrument: string;
}

class FundamentalsServiceImpl extends HttpService {

    public async lookup(...symbols: string[]): Promise<IFundamentalData[]> {
        const resp = await this.request(`/fundamentals/${symbols.join()}`);

        // only one response
        if (symbols.length === 1) {
            return [resp];
        }

        return resp.results;
    }

}

export const FundamentalsService = new FundamentalsServiceImpl();
