/// <reference types="tree-sitter-cli/dsl" />

module.exports = grammar({
  name: "flow_scenario",

  extras: () => [],

  rules: {
    source_file: ($) => repeat(choice($._line, "\n")),

    _line: ($) =>
      choice($.comment, $.divider, $.header_directive, $.step, $.quoted_string),

    comment: () => token(seq("#", /[^\n]*/)),

    divider: () => token(/---+\s*[A-Za-z]+\s*---+/),

    header_directive: ($) =>
      seq(
        field("keyword", $.directive_keyword),
        optional(seq(/[ \t]+/, field("value", $.rest_of_line))),
      ),

    directive_keyword: () =>
      token(
        choice(
          /[Ss][Tt][Aa][Rr][Tt]/,
          /[Ss][Cc][Oo][Pp][Ee]/,
          /[Ee][Xx][Cc][Ll][Uu][Dd][Ee]/,
          /[Tt][Aa][Gg][Ss]/,
          /[Ll][Ii][Mm][Ii][Tt]/,
          /[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd]/,
        ),
      ),

    step: ($) =>
      seq(
        field("keyword", $.step_keyword),
        optional(seq(/[ \t]+/, field("args", $.step_args))),
      ),

    step_keyword: () =>
      token(
        choice(
          /[Vv][Ii][Ss][Ii][Tt]/,
          /[Gg][Oo][Tt][Oo]/,
          /[Cc][Ll][Ii][Cc][Kk][Ll][Ii][Nn][Kk]/,
          /[Cc][Ll][Ii][Cc][Kk][Bb][Uu][Tt][Tt][Oo][Nn]/,
          /[Cc][Ll][Ii][Cc][Kk]/,
          /[Ff][Ii][Ll][Ll][Ii][Nn]/,
          /[Ff][Ii][Ll][Ll]/,
          /[Ss][Ee][Ll][Ee][Cc][Tt]/,
          /[Cc][Hh][Oo][Oo][Ss][Ee]/,
          /[Cc][Hh][Ee][Cc][Kk]/,
          /[Ss][Uu][Bb][Mm][Ii][Tt]/,
          /[Ww][Aa][Ii][Tt][Ff][Oo][Rr][Uu][Rr][Ll]/,
          /[Ww][Aa][Ii][Tt][Ff][Oo][Rr][Ss][Ee][Ll][Ee][Cc][Tt][Oo][Rr]/,
          /[Ww][Aa][Ii][Tt]/,
          /[Ss][Nn][Aa][Pp][Ss][Hh][Oo][Tt]/,
          /[Uu][Ss][Ee]/,
        ),
      ),

    step_args: ($) => seq(choice($.quoted_string, $.unquoted_arg), repeat(seq(/[ \t]+/, choice($.quoted_string, $.unquoted_arg)))),

    quoted_string: () => token(seq('"', /[^"]*/, '"')),

    unquoted_arg: () => token(/[^\s"]+/),

    rest_of_line: () => token(/[^\n]+/),
  },
});
