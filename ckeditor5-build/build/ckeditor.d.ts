/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { CKFinderUploadAdapter } from "@ckeditor/ckeditor5-adapter-ckfinder";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import {
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
} from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import {
  Image,
  ImageCaption,
  ImageInsert,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";
declare class Editor extends ClassicEditor {
  static builtinPlugins: (
    | typeof Alignment
    | typeof Autoformat
    | typeof BlockQuote
    | typeof Bold
    | typeof CKFinderUploadAdapter
    | typeof Essentials
    | typeof FindAndReplace
    | typeof FontBackgroundColor
    | typeof FontColor
    | typeof FontFamily
    | typeof FontSize
    | typeof Heading
    | typeof Highlight
    | typeof Image
    | typeof ImageCaption
    | typeof ImageInsert
    | typeof ImageStyle
    | typeof ImageToolbar
    | typeof ImageUpload
    | typeof Indent
    | typeof Italic
    | typeof Link
    | typeof List
    | typeof MediaEmbed
    | typeof Paragraph
    | typeof Table
    | typeof TableToolbar
    | typeof TextTransformation
    | typeof Undo
  )[];
  static defaultConfig: EditorConfig;
}
export default Editor;
