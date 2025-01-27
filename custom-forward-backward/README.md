# custom-forward-backward

`custom-forward-backward` is a custom React hook that provides functionality for navigating back and forward through options. It takes an array of options and returns an object with methods and data to manage the navigation.

By default, the hook sets the currently selected option to be the last item in the provided array of options. This allows you to start with the last option as the initial state. However, you can customize the starting point of navigation by providing the defaultIndex parameter when using the hook.

The defaultIndex parameter is an optional number that represents the index of the option from which the navigation should start. If defaultIndex is not provided, the hook will default to using the last index of the options array as the initial value for navigation.

With this hook, you can use the onForwardClickHandler method to navigate to the next option (if available) and the onBackClickHandler method to move to the previous option (if available). The hook also exposes the currentOption property, which represents the currently selected option.

## Installation

To use custom_hook_ back-forward_, you need to have React and TypeScript installed in your project. Then, you can install the package using your preferred package manager:

To run this package locally in Your project

1. Clone this Repo. 
```bash
$ git clone https://github.com/shrey0303/NPM.git
```

2. Move to Root directory of your cloned package and type
```bash
$ npm link
```
This creates a symbolic link globally on your system, allowing you to use this package in other projects.

3. Now move to your project and type

```bash
$ npm link custom-forward-backward
```
4. If you want to unlink package 
```bash
$ npm unlink custom-forward-backward
```
Alternative way is to specify the path in the package.json file of your project.

## Usage

Import hook from react-back-forward-options:

`import {useBackForwardOptions} from 'custom-forward-backward';`

Then, use the useBackForwardOptions hook in your component:

```js
    const MyComponent: React.FC = () => {
        const options = [
            {id: 'id1', content: 'content'},
            {id: 'id2', content: 'content'},
            {id: 'id3', content: 'content'},
        ];

        // Start navigation from the second option (index 1)
        const {
            onForwardClickHandler,
            onBackClickHandler,
            currentOption,
            isFirstOption,
            isLastOption
        } = useBackForwardOptions({ options, defaultIndex: 1 });

        return (
            <div>
                <h1>My Options</h1>
                <div>
                    <button onClick={onBackClickHandler} disabled={isFirstOption}>
                        Back
                    </button>
                    <span>{currentOption.content}</span>
                    <button onClick={onForwardClickHandler} disabled={isLastOption}>
                        Forward
                    </button>
                </div>
            </div>
        );
    };

export default MyComponent;
```

## Hook API

The 'useBackForwardOptions' hook returns an object with the following properties:

`onForwardClickHandler`
A function that advances to the next option, if available.

`onBackClickHandler`
A function that moves to the previous option, if available.

`options`
The array of options passed to the hook.

`defaultIndex` - (Optional) The index of the option from which the navigation should start. If not provided, it defaults to the last index of the options array.

`currentOption`
The currently selected option in the array.

`isFirstOption`
A boolean indicating whether the current option is the first option in the array.

`isLastOption`
A boolean indicating whether the current option is the last option in the array.
