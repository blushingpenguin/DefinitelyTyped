import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FluentBundle, FluentResource } from '@fluent/bundle';
import {
    GetString,
    LocalizationProps,
    LocalizationProvider,
    Localized,
    useLocalization,
    withLocalization
} from '@fluent/react';

// ReactLocalization examples:
const bundle = new FluentBundle('en-US');
bundle.addResource(new FluentResource(`some-message = Hello`));

// Localized examples:
const Test = () => (
    <Localized id="hello-world">
        <p>Hello, world!</p>
    </Localized>
);

// LocalizationProvider examples:
function* generateBundles(currentLocales: string[]) {
    for (const locale of currentLocales) {
        const bundle = new FluentBundle(locale);
        bundle.addResource(new FluentResource(`some-message = Hello`));
        yield bundle;
    }
}

ReactDOM.render(
    <LocalizationProvider bundles={generateBundles(['en-US'])}>Content</LocalizationProvider>,
    document.getElementById('root'),
);

// withLocalization examples:
interface Props {
    otherProp: number;
    someOtherProp: string;
}
function HelloButton(props: Props & LocalizationProps) {
    const { getString } = props;

    return <button onClick={() => alert(getString('hello'))}>👋</button>;
}

const LocalizedHelloButton = withLocalization(HelloButton);

// Remove `getString` from list of required props:
export const Test2 = () => <LocalizedHelloButton otherProp={2} someOtherProp="abc" />;
// Should not allow `getString` prop:
export const Test3 = () => (
    // $ExpectError
    <LocalizedHelloButton otherProp={2} someOtherProp="abc" getString={() => {}} />
);

// Should not allow any other props to be omitted:
export const Test4 = () => (
    // $ExpectError
    <LocalizedHelloButton otherProp={2} />
);

// useLocalization examples:
function HelloHookButton(props: Props & LocalizationProps) {
    const getString: GetString = useLocalization();
    return <button onClick={() => alert(getString('hello hooks'))}>👋</button>;
}
