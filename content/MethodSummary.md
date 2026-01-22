*Detailed description of the dataset, including its key features and how it was constructed, can be found in <a href="/documents/DataConstructionDetails_v01.pdf"> this document (pdf)</a>*.

<hr class="bg-blue-fade-out-4" style="margin: 0 100px 0 0" />

We collected information from the complete set of patent grant publications issued weekly by the United States Patent and Trademark Office (USPTO). For each patent — in the universe of utility patents awarded by the USPTO to both U.S. and non-U.S. firms — we identified patent assignees listed in the patent grant document, countries of these assignees, and whether each assignee is a firm, an individual, or a government entity. Using this information, we matched patents to the publicly listed firms in Worldscope database.

The matching algorithm involved two main steps. First, we standardized patent assignee and firm names, focusing on unifying suffixes and removing the non-informative parts of patent assignee and firm names. Second, we applied multiple fuzzy-string matching techniques to identify the firm, if any, to which each patent belongs.
