/**
 * 清除双引号
 * @param {string} val
 * @returns
 */
function splitDouble(val) {
  return val.match(/".+?"/g)[0].replace(/"/g, "");
}

function txt2json(data) {
  // match region
  const regionData = data.match(/#region[\w|\W]+?#endregion/g);

  const groups = regionData.map((v, i) => {
    let region = v.match(/#region [\w|\W]+?\r\n/);
    // 计算组名
    const name = region[0].match(/(tshock.|Non-)+?[\w]+/)?.[0];
    let children = v.match(/(\[Obsolete|\[Description)[\w|\W]+?;/g);
    // 计算该组所有子项
    children = children.map((o, idx) => {
      const child = o.replace(/\t/g, "").replace(/;/g, "").split("\r\n");
      let obj = {};
      child.forEach((_) => {
        const __ = splitDouble(_);
        if (/Description/.test(_)) obj["description"] = __;
        else if (/Obsolete/.test(_)) obj["obsolete"] = __;
        else obj["value"] = __;
      });
      return obj;
    });
    return { name, children };
  });
  if (typeof groups === "object") return JSON.stringify({ groups });
  return groups;
}

export default txt2json;
