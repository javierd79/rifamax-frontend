def resp_json
  [
    taquilla: {
      id: RiferosTaquilla.find_by_taquilla_id(1).taquilla.user.id,
      name: RiferosTaquilla.find_by_taquilla_id(1).taquilla.user.name,
      email: RiferosTaquilla.find_by_taquilla_id(1).taquilla.user.email,
      phone: RiferosTaquilla.find_by_taquilla_id(1).taquilla.phone,
    },
    riferos: [
      RiferosTaquilla.find_by_taquilla_id(@current_user.taquilla.id).rifero.user.id.map do |rifero|
        {
          id: rifero.id,
          name: rifero.name,
          email: rifero.email,
        }
      end
    ]
  ]
  end