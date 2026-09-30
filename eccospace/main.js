document.querySelectorAll('.module').forEach(function (module) {
  module.addEventListener('toggle', function () {
    if (!module.open) return;
    document.querySelectorAll('.module[open]').forEach(function (other) {
      if (other !== module) other.open = false;
    });
  });
});
