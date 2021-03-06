
import { CucumberJsonReport } from "./cucumber-json";
import { ICucumberJsonReport } from "./cucumber-json-interface";
import { extendedReporterPlugin } from "./reporter";
import { IReporter } from "./reporter-interface";

const reporter: () => IReporter = () => {
    const report: ICucumberJsonReport = new CucumberJsonReport();
    return {
        reportFixtureStart(name: string, path: string) {
            extendedReporterPlugin.reportFixtureStart.call(this, name, path, report);
        },
        reportTaskDone(endTime: Date, passed: number, warnings: string[]) {
            extendedReporterPlugin.reportTaskDone.call(this, endTime, passed, warnings, report);
        },
        reportTaskStart(startTime: Date, userAgents: string[], testCount: number) {
            extendedReporterPlugin.reportTaskStart.call(this, startTime, userAgents, testCount, report);
        },
        reportTestDone(name: string, testRunInfo: any) {
            extendedReporterPlugin.reportTestDone.call(this, name, testRunInfo, report);
        },
        renderErrors(errs: any[]) {
            return extendedReporterPlugin.renderErrors.call(this, errs);
        },
        createErrorDecorator() {
            return extendedReporterPlugin.createErrorDecorator.call(this);
        },
    };
};

export = reporter;
