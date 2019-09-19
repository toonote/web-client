# TooNote - WebClient

web client, also applied in electron and webview based desktop app.

## Structure

Code was splited in layers, and communicate by events and methods (on vue `$ref` instance).

Each Layer produces an individual dist file, so they can be used seperately.

- View Layer: render views fro user state / note list / background tasks / note editor / note preview etc.
- Controller Layer: hold the global state, work with Model Layer and UI layer.
- Model Layer: local cache / data storage / network io etc. May be different in different platforms, but try to keep the same API as much as possible.
- SDK for TooNote API: data fetch / post for TooNote API.

The final WebClient for TooNote will be built in different combines. for example:

- Editor Version: Just the Editor in View Layer, plus a little logic code to open/save files. No storage or note management included.
- Lite Version: View Layer + Controller Layer + Model Layer (for local usage), No need to connect the server, No login, No data sync.
- Full Version: View Layer + Controller Layer + Model Layer + TooNote SDK, the full functional TooNote version, data stores in remote server of TooNote.

## View Layer

The UI includes the followings:

- `Sidebar`
    - `UserInfo` show information of current login user.
    - `NoteTree` show the index of a notebook.
- `Editor` the markdown editor.
- `Preview` preview of current content in editor.

The interface of View Layer is an instance of `WebClientView`, includes the following members:

- `app` the main Vue app instance, it will emit events and provide several methods to interact with external world. **You should call `$mount()` method to mount the app to the container DOM element in page.**
- `setData()` a method to inject data for each UI part.

### Data Interface

The state of view is totally decided by the data it receives. In order to inject the data from outside world, you shoud call `setData()` method of View Layer.

```javascript
const userInfo = {
    name: 'TooBug',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1243593?s=100&v=4',
    labels: ['SVIP'],
}
webClientView.setData('userInfo', userInfo);
```

The value of data should be a plain object. You can call the method any times as you wish, View Layer will respond to the data change, and show the latest UI.

But, for better performance, you should not override the original data object (`userInfo` in this example), in any case, you should just update the value of a member. (for example, `userInfo.name = 'TooooBug'`.)

Full list of data name and structure:

- `userInfo` used by `UserInfo` component
    - `name` user name
    - `avatarUrl` url of user avatar
    - `labels` an array of labels
- `editor` used by `Editor` component and `Preview` component
    - `content` the content (in markdown)
- `notebook` current notebook, used by `NoteTree` component
    - `title` title of notebook
    - `categories` an array of categories in notebook
        - `{category}` the element of the array above (this key not exist)
            - `{key}` the key of above object property means the category name, for example `category1`
            - `{value}` an array of notes.
                - `{note}` the element of the array above (this key not exist)
                    - `id` note id
                    - `title` note title

An example of notebook:

```
{
    title: 'notebook1',
    categories: {
        'category1': [{
            id: '1',
            title: 'note1'
        }, {
            id: '2',
            title: 'note2'
        }],
        'category2': [{
            id: '3',
            title: 'note3'
        }, {
            id: '4',
            title: 'note4'
        }],
    }
}
```

### Events

Events are emitted when user interact with the UI. Each event follows the following format:

- event name: `prefix.eventName` the prefix will be the module. Modules may not map to the UI parts.
- event data: in an object.

Full list of events:

- `note` prefix, means note related events
    - `note.new` create a new note
        - `data` event data
            - `context`
                - `type` context type, `category` | `note`
                - `id` category id or note id
            - `from` the source of event, value can be `menu` | `noteTree` | `shortcut`
    - `note.delete` delete a note
        - `data` event data
            - `id` noteId
    - `note.rename`
    - `note.move`
    - `note.switchActive` switch current active note
        - `data` event data
            - `id` noteId  
- `category` prefix, means category related events
- `notebook` prefix, means notebook related events
- `editor` prefix, means editor related events
    - `editor.change` content changed
    - `editor.scroll` editor view scrolled
- `preview` prefix, means preview related events
    - `preview.linkClick` user clicked the link in preview
- `user` prefix, means user related events
    - `user.login` login
    - `user.logout` logout

### Methods

In most cases, you should inject an data item to control the behavior of View Layer. But in some cases, call a method is an easier way to go.

- `preivew.scrollTo(y)` scroll preview section to `y` px.

## Controller Layer

Hold the global state, work with Model Layer and UI layer. Since it's called WebClient, it will work like tranditional web application: just hold little data in client side. Most user actions will trigger network communications.

## Model Layer

local cache / data storage / network io etc. May be different in different platforms, but try to keep the same API as much as possible.

## SDK for TooNote API

data fetch / post for TooNote API.
