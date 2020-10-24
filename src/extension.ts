// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "basadify" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('basadify.basadify', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('May the Lord help your code 🙏🏻');
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage('Editor does not exist');
			return;
		}
		const sacredMsgs: string[] = [];
		const quickPick = vscode.window.createQuickPick();
		const lang = editor.document.languageId;

		const hashCommentLangs = [
			'sql',
			'python',
			'r',
			'yaml',
			'dockerfile',
			'perl'
		]
		const dashCommentsLangs = [
			'haskell',
			'lua',
			'sql'
		]

		if (lang === 'javascriptreact' || lang === 'typescriptreact') {
			sacredMsgs.push('BOF', 'EOF');
		} else {
			sacredMsgs.push('BOF', 'EOF', 'בס"ד', 'בסד', 'בסיעתא דשמיא', 'בעזרת השם', 'בעז"ה', 'ב"ה', 'בה', 'אם ירצה השם', 'אי"ה', 'איה', 'Basad', 'Besiyata Dishmaya', 'BS"D', 'B"H', "with Gods help", "B'ezrat HaShem");
		}

		quickPick.canSelectMany = false;
		quickPick.items = sacredMsgs.map(msg => ({ label: msg }));
		quickPick.placeholder = "Choose your flavour";

		quickPick.onDidChangeSelection(([item]) => {
			/* 			const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem();
						statusBarItem.text = "";
						statusBarItem.tooltip = 'Made with 💙 by Hezy Laplacian';
						statusBarItem.show(); */

			const position = editor.selection.end;
			const head = position.with(editor.document.positionAt(0));
			const end = position.with(editor.document.lineAt(editor.document.lineCount - 1).lineNumber);

			if (item.label === 'BOF') {
				editor.edit(edit => {
					if (lang === 'html') {
						edit.insert(head, `<!-- בס"ד -->\n\n`);
					} else if (hashCommentLangs.includes(lang)) {
						edit.insert(head, `# בס"ד\n\n`);
					} else if (dashCommentsLangs.includes(lang)) {
						edit.insert(head, `-- בס"ד\n\n`);
					} else {
						edit.insert(head, `/*** בס"ד ***/\n\n`);
					}
				});
			}

			if (item.label === 'EOF') {
				editor.edit(edit => {
					if (lang === 'html') {
						edit.insert(end, `\n\n<!-- בס"ד -->\n`);
					} else if (hashCommentLangs.includes(lang)) {
						edit.insert(end, `\n\n# בס"ד\n\n`);
					} else if (dashCommentsLangs.includes(lang)) {
						edit.insert(end, `\n\n-- בס"ד\n\n`);
					} else {
						edit.insert(end, `\n\n/*** בס"ד ***/\n`);
					}
				});
			}

			if (item) {
				editor.edit(edit => {
					if (lang === 'html') {
						edit.insert(position, `	<!-- ${item.label} -->`);
					} else if (hashCommentLangs.includes(lang)) {
						edit.insert(position, `	# ${item.label}`);
					} else if (dashCommentsLangs.includes(lang)) {
						edit.insert(position, `	-- ${item.label}`);
					} else if (lang === 'css') {
						edit.insert(position, ` /* ${item.label} */`);
					}
					else {
						edit.insert(position, `	// ${item.label}`);
					}
				})
				quickPick.dispose();
			}
			vscode.window.setStatusBarMessage('$(book) File Basadified!$(symbol-event) - Made with 🍀 by Hezy Laplacian', 50000);
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
		vscode.window.showInformationMessage('✨');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('Thanks for using Basadify 🙏🏻');
}
